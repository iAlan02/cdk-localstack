import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "node:path";
import { Role } from "aws-cdk-lib/aws-iam";

export interface LambdaFunctionProps {
  role: Role;
  functionName?: string;
}

export class HelloFunction extends Construct {
  public readonly function: lambda.Function;

  constructor(scope: Construct, id: string, props: LambdaFunctionProps) {
    super(scope, id);

    this.function = new lambda.Function(this, "HelloFunction", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler", // match your src/index.js
      code: lambda.Code.fromAsset(path.join(__dirname, "../src")),
      role: props.role,
      functionName: props.functionName ?? "aws_hello_fc",
    });
  }
}
