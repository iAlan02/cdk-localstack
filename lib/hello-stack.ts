import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaExecRole } from "./lambda-role";
import { HelloFunction } from "./lambda-function";
import { HelloApi } from "./api-gateway";

export class HelloStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create role
    const roleConstruct = new LambdaExecRole(this, "LambdaRole");

    // Create Lambda
    const lambdaConstruct = new HelloFunction(this, "HelloFn", {
      role: roleConstruct.role,
      functionName: "aws_hello_fc",
    });

    // Create API Gateway
    const apiConstruct = new HelloApi(this, "HelloApi", {
      handler: lambdaConstruct.function,
      restApiName: "hello-localstack-api",
    });

    new cdk.CfnOutput(this, "ApiUrl", { value: apiConstruct.api.url });
    new cdk.CfnOutput(this, "FunctionName", {
      value: lambdaConstruct.function.functionName,
    });
  }
}
