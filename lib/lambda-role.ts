import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

export interface LambdaRoleProps {
  description?: string;
}

export class LambdaExecRole extends Construct {
  public readonly role: iam.Role;

  constructor(scope: Construct, id: string, props?: LambdaRoleProps) {
    super(scope, id);

    this.role = new iam.Role(this, "LambdaExecRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      description:
        props?.description ?? "Execution role for hello-localstack lambda",
    });

    // Attach basic execution managed policy
    this.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole"
      )
    );

    // Add inline policy for logs (matches your original stack)
    this.role.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        resources: ["*"],
      })
    );
  }
}
