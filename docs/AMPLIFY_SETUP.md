# AWS Amplify Gen 2 Configuration

This project has been configured with AWS Amplify Gen 2 to include an S3 bucket for storing portfolio assets.

## 🚀 Initial Setup

### 1. Configure AWS Credentials

Before you can use Amplify, you need to configure your AWS credentials:

```bash
# Option 1: Use AWS CLI
aws configure

# Option 2: Use Amplify CLI
npx ampx configure profile
```

### 2. Install Dependencies

Amplify dependencies are already installed, but if you need to reinstall them:

```bash
npm install
```

## 📁 Project Structure

```
amplify/
├── backend.ts          # Backend definition (S3 bucket)
├── storage/
│   └── resource.ts     # S3 resource configuration
├── tsconfig.json       # TypeScript configuration
└── README.md          # Amplify-specific documentation

src/lib/
├── amplify.ts         # Amplify configuration for frontend
└── storage.ts         # Functions to interact with S3

src/components/
└── FileUpload.astro   # Example component for file uploads
```

## 🛠️ Available Commands

### Local Development

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

## 🪣 Configured Resources

### S3 Bucket

- **Name**: `portfolio-assets-bucket-1758215507`
- **Purpose**: Store static portfolio assets
- **Access**: Public read access
- **Deletion Policy**: DESTROY (change to RETAIN for production)

## 💻 Frontend Usage

### Basic Configuration

The `src/lib/amplify.ts` file automatically configures Amplify when imported.

### Upload Files

```typescript
import { uploadToPortfolioBucket, getPortfolioFileUrl } from '../lib/storage';

// Upload a file
const file = // your file
const result = await uploadToPortfolioBucket(file, 'my-file.jpg');

// Get public URL
const url = await getPortfolioFileUrl('my-file.jpg');
```

### Example Component

Use the `FileUpload.astro` component as an example of how to implement file uploads in your portfolio.

## 🔧 Advanced Configuration

### Change Region

Edit `amplify/backend/storage/resource.ts`:

```typescript
export const storage = defineStorage({
  name: "portfolio-assets-bucket",
  access: (allow) => ({
    "public/*": [allow.guest.to(["read"])],
  }),
  // Add region configuration if needed
});
```

### Change Deletion Policy

The deletion policy is managed by AWS CDK. For production, consider using RETAIN instead of DESTROY to prevent accidental data loss.

## 🚨 Next Steps

1. **Configure AWS credentials** (required)
2. **Run `npm run amplify:dev`** to start the sandbox
3. **Test functionality** with the FileUpload component
4. **Deploy to production** when ready

## 📚 Additional Resources

- [Amplify Gen 2 Documentation](https://docs.amplify.aws/react/build-a-backend/)
- [S3 Guide with Amplify](https://docs.amplify.aws/react/build-a-backend/storage/)
- [AWS Credentials Configuration](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
