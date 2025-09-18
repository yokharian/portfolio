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

## 6. Deploy

- Trigger the initial frontend deployment by pushing to a tracked branch. The repo uses GitHub’s built-in webhook integration to call your Amplify hosting webhook, so ensure the `amplify.yml` file is present in the repo for Amplify to pick up build settings.
- Backend infrastructure deploys through `.github/workflows/ci-cd-aws.yml`, which runs tests/builds and then calls `npx ampx pipeline-deploy` via the Amplify CLI. Verify required AWS secrets (`AMPLIFY_APP_ID`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and optional `AWS_REGION`) are set before triggering the workflow.
- Confirm that both the frontend webhook trigger and backend CLI deploy complete successfully in GitHub Actions and the Amplify console.

## More info

- [Deployment protection rules](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments#deployment-protection-rules)
- [Github secret storage](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#secrets-context)
