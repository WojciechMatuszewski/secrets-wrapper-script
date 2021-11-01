#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { SecretsManagerEnvVariablesStack } from "../lib/secrets-manager-env-variables-stack";

// console.log(process.env);

const app = new cdk.App();
new SecretsManagerEnvVariablesStack(app, "SecretsManagerEnvVariablesStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
