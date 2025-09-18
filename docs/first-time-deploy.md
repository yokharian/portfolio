# First-Time Deployment Guide

Use this checklist when preparing a fresh AWS Amplify deployment of the portfolio project.

## 1. Create an Amplify app

- Create the app in the AWS Amplify console or via the Amplify CLI.
- Connect the repository branch you want to deploy.

## 2. Provision the Amplify service role

- If you do not already have one, create the Amplify backend service role following the [AWS guide](https://docs.aws.amazon.com/amplify/latest/userguide/amplify-service-role.html).

## 3. Grant the role S3 read access (only if you choosed a custom AWS IAM permission police different than AdministratorAccess-Amplify)

- Attach an IAM policy that grants `s3:GetObject` and `s3:ListBucket` on the S3 bucket created for this app's assets.
- This ensures the CodeBuild environment can download the required assets during the build.

## 4. Attach the role to the Amplify app according to the official [AWS guide](https://docs.aws.amazon.com/amplify/latest/userguide/amplify-service-role.html)

- In the Amplify console (App settings → General → Service role), assign the role from the previous steps to the app.
- Future builds will automatically assume this role.

## 5. Configure environment variables

- Set `AWS_BUCKET_ASSETS` in the Amplify console (App settings → Environment variables) to the name of the assets bucket.
- If this variable is missing at build time, the build will skip downloading assets from S3.

## 6. Deploy

- Trigger the initial deployment from the Amplify console or push a commit to the connected branch.
- Confirm that the build downloads the assets and the site deploys successfully.
