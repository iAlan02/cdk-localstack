# cdk-localstack

This repository contains a small AWS CDK (TypeScript) project that is
convenient to develop and test against LocalStack (a fully local AWS
service emulator). Use the included `docker-compose.yaml` to run LocalStack
locally, and the normal CDK commands for building, synthesizing and
deploying stacks.

This project is intentionally simple so you can iterate quickly without
incurring real AWS costs while developing.

## What you'll find here

- CDK app source: `lib/` and `bin/`
- A small test harness under `test/` (Jest + TypeScript)
- `docker-compose.yaml` configured to run LocalStack for local testing

## Prerequisites

- Docker & Docker Compose
- Node.js (16+) and npm
- AWS CDK CLI (for normal deploys) — optionally installed via `npm i -g aws-cdk`

## Quick start (local development)

1. Install dependencies

```bash
npm install
```

1. Start LocalStack (runs in Docker via the included compose file)

```bash
docker-compose up -d
```

LocalStack exposes AWS-compatible endpoints on localhost (commonly
port 4566). You can inspect logs with `docker-compose logs -f`.

1. Build the project

```bash
npm run build
```

1. Synthesize the CloudFormation template (verify output)

```bash
npx cdk synth
```

1. Run tests

```bash
npm run test
```

## Deploying

- To deploy to your real AWS account/region (be careful):

```bash
npx cdk deploy
```

- To exercise the stacks against LocalStack (recommended for local development), keep
  LocalStack running and point whatever AWS SDK or CLI calls you make to the
  LocalStack endpoints (usually `http://localhost:4566`).

  Notes:

  - You can interact with LocalStack using the `awslocal` CLI (provided by
    LocalStack) or by passing `--endpoint-url` to `aws` CLI commands.
  - There are community helpers such as `cdk-local` that wrap `cdk` to
    target LocalStack; consult LocalStack docs if you want a seamless
    CDK-to-LocalStack workflow.

## Useful commands (same as before)

- `npm run build`   compile TypeScript to JS
- `npm run watch`   watch for changes and compile
- `npm run test`    run the jest unit tests
- `npx cdk deploy`  deploy this stack to your default AWS account/region
- `npx cdk diff`    compare deployed stack with current state
- `npx cdk synth`   emit the synthesized CloudFormation template

## Notes

- This repo is intended for fast iteration with LocalStack; before
  deploying to real AWS, double-check the deployed resources and any
  IAM permissions.
- If you'd like, I can add a `Makefile` or npm scripts that automate a
  LocalStack-based deploy workflow (e.g., start LocalStack -> synth ->
  deploy to LocalStack). Just tell me which behavior you prefer.

---

README last updated to describe LocalStack-based local development and
the basic CDK workflow.
