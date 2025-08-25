// test/private-api-with-domain.test.ts

import { App, Stack, aws_ec2 as ec2, aws_lambda as lambda_, aws_route53 as route53 } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { PrivateApiWithDomain } from '../src';

// Silence noisy jsii deprecation warnings from AwsCustomResource provider during tests
const originalWarn = console.warn;
beforeAll(() => { (console as any).warn = jest.fn(); });
afterAll(() => { (console as any).warn = originalWarn; });

function synthTemplate(): Template {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  const vpc = new ec2.Vpc(stack, 'Vpc', {
    maxAzs: 2,
    natGateways: 0,
    subnetConfiguration: [
      { name: 'IsoA', subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      { name: 'IsoB', subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
    ],
  });

  const fn = new lambda_.Function(stack, 'Fn', {
    runtime: lambda_.Runtime.NODEJS_20_X,
    handler: 'index.handler',
    code: lambda_.Code.fromInline('exports.handler=async()=>({statusCode:200,body:"ok"})'),
  });

  const hz = new route53.PrivateHostedZone(stack, 'Hz', { vpc, zoneName: 'corp.local' });

  new PrivateApiWithDomain(stack, 'UnderTest', {
    vpc,
    handler: fn,
    hostedZone: hz,
    subdomain: 'my-api',
  });

  return Template.fromStack(stack);
}

test('creates Interface VPCE for execute-api', () => {
  const template = synthTemplate();
  template.hasResourceProperties('AWS::EC2::VPCEndpoint', {
    VpcEndpointType: 'Interface',
    PrivateDnsEnabled: true,
  });
});

test('REST API is PRIVATE and execute endpoint disabled', () => {
  const template = synthTemplate();
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    DisableExecuteApiEndpoint: true,
    EndpointConfiguration: { Types: ['PRIVATE'] },
  });

  // Resource policy contains Deny when aws:SourceVpce != endpoint id
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Policy: Match.objectLike({
      Statement: Match.arrayWith([
        Match.objectLike({
          Effect: 'Deny',
          Condition: {
            StringNotEquals: {
              'aws:SourceVpce': Match.anyValue(),
            },
          },
        }),
      ]),
    }),
  });
});

test('private domain and base path mapping exist', () => {
  const template = synthTemplate();

  // Look for the REST "V2" domain resources (still under ApiGateway, not ApiGatewayV2)
  const domains = template.findResources('AWS::ApiGateway::DomainNameV2');
  expect(Object.keys(domains).length).toBeGreaterThan(0);

  const hasExpectedName = Object.values<any>(domains).some(
    (res: any) => res.Properties?.DomainName === 'my-api.corp.local',
  );
  expect(hasExpectedName).toBe(true);

  // Base path mapping for private REST custom domains
  const mappings = template.findResources('AWS::ApiGateway::BasePathMappingV2');
  expect(Object.keys(mappings).length).toBeGreaterThan(0);

  // Optional: ensure the access association to the VPCE exists
  const associations = template.findResources('AWS::ApiGateway::DomainNameAccessAssociation');
  expect(Object.keys(associations).length).toBeGreaterThan(0);
});

test('Route53 alias A record points at VPCE', () => {
  const template = synthTemplate();
  template.hasResourceProperties('AWS::Route53::RecordSet', {
    Name: 'my-api.corp.local.',
    Type: 'A',
    AliasTarget: {
      EvaluateTargetHealth: false,
      DNSName: Match.anyValue(),
      HostedZoneId: Match.anyValue(),
    },
  });
});
