# AWS Amplify Gen 2 Backend

This directory contains the AWS Amplify Gen 2 backend configuration for the portfolio.

## 🏗️ Structure

- `backend.ts` - Backend resource definitions (S3 bucket)
- `storage/resource.ts` - S3 resource configuration
- `tsconfig.json` - TypeScript configuration

## 🛠️ Available Commands

### Development

```bash
# Start development sandbox
npm run amplify:dev

# Or directly
npx ampx sandbox
```

### Deployment

```bash
# Deploy to production
npm run amplify:deploy

# Or directly
npx ampx deploy
```

### Cleanup

```bash
# Delete sandbox
npm run amplify:delete

# Or directly
npx ampx sandbox delete
```

## ☁️ Configured Resources

### S3 Bucket

- **Name**: `portfolio-assets-bucket`
- **Purpose**: Store portfolio static assets
- **Access**: Public read access
- **Deletion Policy**: DESTROY (change to RETAIN for production)

## 🔑 Credentials Setup

Before using Amplify commands, configure your AWS credentials:

```bash
# Configure Amplify profile
npx ampx configure profile

# Or configure AWS CLI
aws configure
```

## 🔗 Frontend Integration

Backend resources are available in the frontend through:

- `src/lib/amplify.ts` - Amplify configuration
- `src/lib/storage.ts` - S3 interaction functions

## 📄 Environment Variables

After running `npx ampx sandbox`, an `amplify_outputs.json` file will be generated with the necessary configurations for the frontend.
