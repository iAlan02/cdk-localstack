import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'node:path';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class HelloStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // IAM role for Lambda
    const role = new iam.Role(this, 'LambdaExecRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'Execution role for hello-localstack lambda'
    });

    // Basic execution policy (logs). Add other actions if your TF had them.
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
    role.addToPolicy(new iam.PolicyStatement({
      actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
      resources: ['*']
    }));

    // Lambda function (uses your repo's src folder)
    const fn = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',                      // match your src/index.js
      code: lambda.Code.fromAsset(path.join(__dirname, '../src')),
      role,
      functionName: 'aws_hello_fc'
    });

    // API Gateway proxy to Lambda (simple equivalent of Terraform api gateway)
    const api = new apigw.LambdaRestApi(this, 'HelloApi', {
      handler: fn,
      restApiName: 'hello-localstack-api',
      proxy: true
    });

    new cdk.CfnOutput(this, 'ApiUrl', { value: api.url });
    new cdk.CfnOutput(this, 'FunctionName', { value: fn.functionName });
  }
}
