import * as cdk from "@aws-cdk/core";
import * as goLambda from "@aws-cdk/aws-lambda-go";
import * as lambda from "@aws-cdk/aws-lambda";
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
    const handler = new lambda.Function(this, "Handler2", {
      code: lambda.Code.fromInline(
        `exports.handler = () => {console.log("from handler")}`
      ),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      layers: [wrapperScriptLayer],
      environment: {
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/wrapper-script"
      }
    });
    // const handler = new goLambda.GoFunction(this, "Handler", {
    //   entry: join(__dirname, "./handler"),
    //   layers: [wrapperScriptLayer],
    // });
  }
}
