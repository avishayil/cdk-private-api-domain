import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'abar',
  authorAddress: 'avishay.bar@cyberark.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.8.0',
  name: 'cdk-private-api-domain',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/avishay.bar/cdk-private-api-domain.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();