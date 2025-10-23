#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HelloStack } from '../lib/hello-stack';

const app = new cdk.App();
new HelloStack(app, 'HelloLocalstackStack', {
  env: {
    account: '000000000000',       // LocalStack commonly uses dummy account id
    region: process.env.AWS_REGION || 'us-east-1'
  }
});
