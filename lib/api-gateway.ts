import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Function as LambdaFunction } from "aws-cdk-lib/aws-lambda";

export interface ApiGatewayProps {
  handler: LambdaFunction;
  restApiName?: string;
}

export class HelloApi extends Construct {
  public readonly api: apigw.LambdaRestApi;

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);

    this.api = new apigw.LambdaRestApi(this, "HelloApi", {
      handler: props.handler,
      restApiName: props.restApiName ?? "hello-localstack-api",
      proxy: true,
    });
  }
}
