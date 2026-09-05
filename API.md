# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### PrivateApiWithDomain <a name="PrivateApiWithDomain" id="cdk-private-api-domain.PrivateApiWithDomain"></a>

#### Initializers <a name="Initializers" id="cdk-private-api-domain.PrivateApiWithDomain.Initializer"></a>

```typescript
import { PrivateApiWithDomain } from 'cdk-private-api-domain'

new PrivateApiWithDomain(scope: Construct, id: string, props: PrivateApiWithDomainProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps">PrivateApiWithDomainProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-private-api-domain.PrivateApiWithDomain.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-private-api-domain.PrivateApiWithDomain.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-private-api-domain.PrivateApiWithDomain.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-private-api-domain.PrivateApiWithDomainProps">PrivateApiWithDomainProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="cdk-private-api-domain.PrivateApiWithDomain.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="cdk-private-api-domain.PrivateApiWithDomain.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="cdk-private-api-domain.PrivateApiWithDomain.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-private-api-domain.PrivateApiWithDomain.isConstruct"></a>

```typescript
import { PrivateApiWithDomain } from 'cdk-private-api-domain'

PrivateApiWithDomain.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-private-api-domain.PrivateApiWithDomain.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.property.aliasRecord">aliasRecord</a></code> | <code>aws-cdk-lib.aws_route53.CfnRecordSet</code> | *No description.* |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.property.api">api</a></code> | <code>aws-cdk-lib.aws_apigateway.RestApi</code> | *No description.* |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.property.basePathMapping">basePathMapping</a></code> | <code>aws-cdk-lib.aws_apigateway.CfnBasePathMappingV2</code> | *No description.* |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | *No description.* |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.property.domainAccessAssociation">domainAccessAssociation</a></code> | <code>aws-cdk-lib.aws_apigateway.CfnDomainNameAccessAssociation</code> | *No description.* |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.property.domainNameV2">domainNameV2</a></code> | <code>aws-cdk-lib.aws_apigateway.CfnDomainNameV2</code> | *No description.* |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomain.property.vpce">vpce</a></code> | <code>aws-cdk-lib.aws_ec2.IInterfaceVpcEndpoint</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-private-api-domain.PrivateApiWithDomain.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `aliasRecord`<sup>Required</sup> <a name="aliasRecord" id="cdk-private-api-domain.PrivateApiWithDomain.property.aliasRecord"></a>

```typescript
public readonly aliasRecord: CfnRecordSet;
```

- *Type:* aws-cdk-lib.aws_route53.CfnRecordSet

---

##### `api`<sup>Required</sup> <a name="api" id="cdk-private-api-domain.PrivateApiWithDomain.property.api"></a>

```typescript
public readonly api: RestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.RestApi

---

##### `basePathMapping`<sup>Required</sup> <a name="basePathMapping" id="cdk-private-api-domain.PrivateApiWithDomain.property.basePathMapping"></a>

```typescript
public readonly basePathMapping: CfnBasePathMappingV2;
```

- *Type:* aws-cdk-lib.aws_apigateway.CfnBasePathMappingV2

---

##### `certificate`<sup>Required</sup> <a name="certificate" id="cdk-private-api-domain.PrivateApiWithDomain.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

---

##### `domainAccessAssociation`<sup>Required</sup> <a name="domainAccessAssociation" id="cdk-private-api-domain.PrivateApiWithDomain.property.domainAccessAssociation"></a>

```typescript
public readonly domainAccessAssociation: CfnDomainNameAccessAssociation;
```

- *Type:* aws-cdk-lib.aws_apigateway.CfnDomainNameAccessAssociation

---

##### `domainNameV2`<sup>Required</sup> <a name="domainNameV2" id="cdk-private-api-domain.PrivateApiWithDomain.property.domainNameV2"></a>

```typescript
public readonly domainNameV2: CfnDomainNameV2;
```

- *Type:* aws-cdk-lib.aws_apigateway.CfnDomainNameV2

---

##### `vpce`<sup>Required</sup> <a name="vpce" id="cdk-private-api-domain.PrivateApiWithDomain.property.vpce"></a>

```typescript
public readonly vpce: IInterfaceVpcEndpoint;
```

- *Type:* aws-cdk-lib.aws_ec2.IInterfaceVpcEndpoint

---


## Structs <a name="Structs" id="Structs"></a>

### PrivateApiWithDomainProps <a name="PrivateApiWithDomainProps" id="cdk-private-api-domain.PrivateApiWithDomainProps"></a>

#### Initializer <a name="Initializer" id="cdk-private-api-domain.PrivateApiWithDomainProps.Initializer"></a>

```typescript
import { PrivateApiWithDomainProps } from 'cdk-private-api-domain'

const privateApiWithDomainProps: PrivateApiWithDomainProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.handler">handler</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | Lambda function to integrate as proxy. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | Private hosted zone for the custom domain. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.subdomain">subdomain</a></code> | <code>string</code> | Subdomain (left-hand label) under the hosted zone. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC to host the execute-api Interface VPC Endpoint. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.basePath">basePath</a></code> | <code>string</code> | Base path mapping on the domain (default: empty). |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.certificateArn">certificateArn</a></code> | <code>string</code> | Reuse an existing ACM cert ARN (same region). |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.createInterfaceEndpoint">createInterfaceEndpoint</a></code> | <code>boolean</code> | Create the Interface VPC Endpoint (execute-api) automatically. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.deployOptions">deployOptions</a></code> | <code>aws-cdk-lib.aws_apigateway.StageOptions</code> | Optional stage options. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.endpointSecurityGroups">endpointSecurityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Security groups for the VPC endpoint. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.endpointSubnets">endpointSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Subnet selection for the VPC endpoint. |
| <code><a href="#cdk-private-api-domain.PrivateApiWithDomainProps.property.restApiName">restApiName</a></code> | <code>string</code> | Optional API name. |

---

##### `handler`<sup>Required</sup> <a name="handler" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.handler"></a>

```typescript
public readonly handler: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

Lambda function to integrate as proxy.

---

##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

Private hosted zone for the custom domain.

---

##### `subdomain`<sup>Required</sup> <a name="subdomain" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.subdomain"></a>

```typescript
public readonly subdomain: string;
```

- *Type:* string

Subdomain (left-hand label) under the hosted zone.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC to host the execute-api Interface VPC Endpoint.

---

##### `basePath`<sup>Optional</sup> <a name="basePath" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.basePath"></a>

```typescript
public readonly basePath: string;
```

- *Type:* string

Base path mapping on the domain (default: empty).

---

##### `certificateArn`<sup>Optional</sup> <a name="certificateArn" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

Reuse an existing ACM cert ARN (same region).

If omitted, a DNS-validated cert is created.

---

##### `createInterfaceEndpoint`<sup>Optional</sup> <a name="createInterfaceEndpoint" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.createInterfaceEndpoint"></a>

```typescript
public readonly createInterfaceEndpoint: boolean;
```

- *Type:* boolean

Create the Interface VPC Endpoint (execute-api) automatically.

---

##### `deployOptions`<sup>Optional</sup> <a name="deployOptions" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.deployOptions"></a>

```typescript
public readonly deployOptions: StageOptions;
```

- *Type:* aws-cdk-lib.aws_apigateway.StageOptions

Optional stage options.

---

##### `endpointSecurityGroups`<sup>Optional</sup> <a name="endpointSecurityGroups" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.endpointSecurityGroups"></a>

```typescript
public readonly endpointSecurityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

Security groups for the VPC endpoint.

---

##### `endpointSubnets`<sup>Optional</sup> <a name="endpointSubnets" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.endpointSubnets"></a>

```typescript
public readonly endpointSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Subnet selection for the VPC endpoint.

---

##### `restApiName`<sup>Optional</sup> <a name="restApiName" id="cdk-private-api-domain.PrivateApiWithDomainProps.property.restApiName"></a>

```typescript
public readonly restApiName: string;
```

- *Type:* string

Optional API name.

---



