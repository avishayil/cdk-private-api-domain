import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'avishayil',
  authorAddress: 'avishay.il@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.8.0',
  name: 'cdk-private-api-domain',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/avishayil/cdk-private-api-domain.git',
  description: 'A CDK construct library that provisions a private Amazon API Gateway with a custom domain name, accessible only through VPC endpoints. It simplifies the creation of internal APIs by combining API Gateway, Route 53, and certificate management into a reusable construct.',
  deps: [
    'aws-cdk-lib@^2.150.0',
    'constructs@^10.3.0',
  ],
  devDeps: [
    'aws-cdk-lib@^2.150.0',
    'constructs@^10.3.0',
    'ts-node',
    'ts-jest',
    'typescript',
    'eslint',
    '@types/jest',
  ],
  publishToPypi: {
    distName: 'cdk-private-api-domain',
    module: 'cdk_private_api_domain',
  },
  stability: 'experimental',
});
project.synth();