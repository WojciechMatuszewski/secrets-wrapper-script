import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as secretsmanager from "@aws-cdk/aws-secretsmanager";
import * as nodeJsLambda from "@aws-cdk/aws-lambda-nodejs";

import { join } from "path";

export class SecretsManagerEnvVariablesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const wrapperScriptLayer = new lambda.LayerVersion(
      this,
      "wrapperScriptLayer",
      {
        code: lambda.Code.fromAsset(join(__dirname, "../wrapper-script")),
        compatibleArchitectures: [lambda.Architecture.X86_64]
      }
    );

    const secret = new secretsmanager.Secret(this, "secret", {
      secretName: "favorite_color",
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const handler = new nodeJsLambda.NodejsFunction(this, "handler", {
      handler: "handler",
      entry: join(__dirname, "./handler.ts"),
      runtime: lambda.Runtime.NODEJS_14_X,
      layers: [wrapperScriptLayer],
      environment: {
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/wrapper-script",
        SECRET_ARN: secret.secretArn,
        force: "ac"
      }
    });

    secret.grantRead(handler);
  }
}
