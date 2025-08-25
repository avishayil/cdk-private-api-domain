import { Stack, aws_apigateway as apigw, aws_certificatemanager as acm, aws_ec2 as ec2, aws_iam as iam, aws_lambda as lambda_, aws_logs as logs, aws_route53 as route53, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface PrivateApiWithDomainProps {
  /** VPC to host the execute-api Interface VPC Endpoint */
  readonly vpc: ec2.IVpc;
  /** Lambda function to integrate as proxy */
  readonly handler: lambda_.IFunction;
  /** Private hosted zone for the custom domain */
  readonly hostedZone: route53.IHostedZone;
  /** Subdomain (left-hand label) under the hosted zone */
  readonly subdomain: string;

  /** Create the Interface VPC Endpoint (execute-api) automatically. */
  readonly createInterfaceEndpoint?: boolean;
  /** Subnet selection for the VPC endpoint. */
  readonly endpointSubnets?: ec2.SubnetSelection;
  /** Security groups for the VPC endpoint. */
  readonly endpointSecurityGroups?: ec2.ISecurityGroup[];

  /** Reuse an existing ACM cert ARN (same region). If omitted, a DNS-validated cert is created. */
  readonly certificateArn?: string;

  /** Optional API name */
  readonly restApiName?: string;
  /** Optional stage options */
  readonly deployOptions?: apigw.StageOptions;
  /** Base path mapping on the domain (default: empty) */
  readonly basePath?: string;
}

export class PrivateApiWithDomain extends Construct {
  public readonly api: apigw.RestApi;
  public readonly certificate: acm.ICertificate;
  public readonly vpce: ec2.IInterfaceVpcEndpoint;
  public readonly domainNameV2: apigw.CfnDomainNameV2;
  public readonly domainAccessAssociation: apigw.CfnDomainNameAccessAssociation;
  public readonly basePathMapping: apigw.CfnBasePathMappingV2;
  public readonly aliasRecord: route53.CfnRecordSet;

  constructor(scope: Construct, id: string, props: PrivateApiWithDomainProps) {
    super(scope, id);

    const fullDomain = `${props.subdomain}.${props.hostedZone.zoneName}`.replace(/\.$/, '');

    // 1) Interface VPC Endpoint for execute-api
    if (props.createInterfaceEndpoint === false) {
      throw new Error('createInterfaceEndpoint=false not supported yet. Pass true (default) or extend the construct to accept an external VPCE.');
    }
    const vpce = new ec2.InterfaceVpcEndpoint(this, 'ApiGwVpce', {
      vpc: props.vpc,
      service: ec2.InterfaceVpcEndpointAwsService.APIGATEWAY,
      subnets: props.endpointSubnets,
      securityGroups: props.endpointSecurityGroups,
    });
    this.vpce = vpce;

    // 2) Certificate (create or import)
    this.certificate = props.certificateArn
      ? acm.Certificate.fromCertificateArn(this, 'ImportedCert', props.certificateArn)
      : new acm.Certificate(this, 'Certificate', {
        domainName: fullDomain,
        validation: acm.CertificateValidation.fromDns(props.hostedZone),
      });

    // 3) REST API (PRIVATE) with resource policy restricting to this VPCE
    this.api = new apigw.RestApi(this, 'PrivateRestApi', {
      restApiName: props.restApiName ?? `${id}-private-api`,
      disableExecuteApiEndpoint: true,
      endpointConfiguration: {
        types: [apigw.EndpointType.PRIVATE],
        vpcEndpoints: [vpce],
      },
      policy: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            principals: [new iam.StarPrincipal()],
            actions: ['execute-api:Invoke'],
            resources: [
              `arn:aws:execute-api:${Stack.of(this).region}:${Stack.of(this).account}:*/*/*/*`,
            ],
          }),
          new iam.PolicyStatement({
            effect: iam.Effect.DENY,
            principals: [new iam.StarPrincipal()],
            actions: ['execute-api:Invoke'],
            resources: [
              `arn:aws:execute-api:${Stack.of(this).region}:${Stack.of(this).account}:*/*/*/*`,
            ],
            conditions: { StringNotEquals: { 'aws:SourceVpce': vpce.vpcEndpointId } },
          }),
        ],
      }),
      deployOptions: props.deployOptions ?? {
        metricsEnabled: true,
        loggingLevel: apigw.MethodLoggingLevel.INFO,
        dataTraceEnabled: false,
        throttlingRateLimit: 1000,
        throttlingBurstLimit: 200,
      },
    });

    // 4) Lambda proxy integration (ANY / and /{proxy+})
    const integration = new apigw.LambdaIntegration(props.handler, { proxy: true });
    this.api.root.addMethod('ANY', integration);
    const proxy = this.api.root.addResource('{proxy+}');
    proxy.addMethod('ANY', integration);

    // 5) Lookup VPCE DNS & HZID (for Route53 alias)
    const lookup = new cr.AwsCustomResource(this, 'ApiGwVpceDnsLookup', {
      onUpdate: {
        service: 'EC2',
        action: 'describeVpcEndpoints',
        parameters: { VpcEndpointIds: [vpce.vpcEndpointId] },
        physicalResourceId: cr.PhysicalResourceId.of(`${vpce.vpcEndpointId}-dns-lookup`),
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE }),
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    const vpceDnsName = lookup.getResponseField('VpcEndpoints.0.DnsEntries.0.DnsName');
    const vpceAliasHzId = lookup.getResponseField('VpcEndpoints.0.DnsEntries.0.HostedZoneId');

    // 6) A-alias record (private zone) -> VPCE DNS
    this.aliasRecord = new route53.CfnRecordSet(this, 'AliasToVpce', {
      hostedZoneId: props.hostedZone.hostedZoneId,
      name: `${fullDomain}.`,
      type: 'A',
      aliasTarget: {
        dnsName: vpceDnsName,
        hostedZoneId: vpceAliasHzId,
        evaluateTargetHealth: false,
      },
    });

    // 7) Private custom domain (DomainNameV2) + VPCE access association
    this.domainNameV2 = new apigw.CfnDomainNameV2(this, 'PrivateDomain', {
      domainName: fullDomain,
      certificateArn: this.certificate.certificateArn,
      endpointConfiguration: { types: ['PRIVATE'] },
      securityPolicy: 'TLS_1_2',
      policy: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            actions: ['execute-api:Invoke'],
            resources: ['execute-api:/*'],
            principals: [new iam.StarPrincipal()],
            conditions: { StringEquals: { 'aws:SourceVpce': vpce.vpcEndpointId } },
            effect: iam.Effect.ALLOW,
          }),
        ],
      }).toJSON(),
    });

    this.domainAccessAssociation = new apigw.CfnDomainNameAccessAssociation(this, 'DomainAccessAssoc', {
      domainNameArn: this.domainNameV2.attrDomainNameArn,
      accessAssociationSource: vpce.vpcEndpointId,
      accessAssociationSourceType: 'VPCE',
    });

    // 8) Base path mapping to API stage
    this.basePathMapping = new apigw.CfnBasePathMappingV2(this, 'DomainBasePathMapping', {
      domainNameArn: this.domainNameV2.attrDomainNameArn,
      restApiId: this.api.restApiId,
      stage: this.api.deploymentStage.stageName,
      basePath: props.basePath ?? '',
    });

    this.basePathMapping.addDependency(this.domainAccessAssociation);
    this.basePathMapping.addDependency(this.aliasRecord);
  }
}