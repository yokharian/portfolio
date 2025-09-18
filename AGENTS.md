# Portfolio — Astro + Tailwind + TypeScript + AWS Amplify

A modern, multilingual personal portfolio site built with Astro, Tailwind CSS, TypeScript, and AWS Amplify Gen 2 for cloud storage capabilities.

## 🚀 Quick Start

**Prerequisites:** Node.js 18+ and npm.

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

   Open http://localhost:8080

3. **Production build**
   ```bash
   npm run build
   ```
   The static site will be generated into the `dist/` directory.

## 🏗️ Architecture

### Frontend Stack

- **Astro** - Static site generator with component islands
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Multilingual Support** - English and Spanish (i18n)

### Backend Stack

- **AWS Amplify Gen 2** - Backend-as-a-Service
- **S3 Storage** - Static asset storage
- **CDK** - Infrastructure as Code

### Development Tools

- **Jest** - Unit testing framework
- **TypeScript** - Type checking and compilation
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
portfolio/
├── amplify/                  # AWS Amplify Gen 2 backend
│   ├── backend.ts            # Backend definition
│   └── storage/resource.ts   # S3 bucket configuration
├── src/
│   ├── blog_posts/           # blog pages in MD format 
│   ├── components/           # Astro components
│   ├── layouts/              # Page layouts
│   ├── pages/                # Astro pages
│   ├── styles/               # CSS files
│   ├── types/                # TypeScript definitions
│   ├── utils/                # Utility functions
│   └── content/              # Content collections
├── public/                   # Static assets
├── docs/                     # Documentation
└── dist/                     # Build output
```

## 🛠️ Available Scripts

### Development

- `npm run dev` - Start development server with hot reloading
- `npm run start` - Alias for dev command
- `npm run preview` - Preview production build locally

### Building

- `npm run build` - Full production build with type checking
- `npm run clean` - Clean build artifacts

### Testing

- `npm test` - Run full test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### AWS Amplify

- `npm run amplify:dev` - Start Amplify development sandbox
- `npm run amplify:deploy` - Deploy to AWS
- `npm run amplify:delete` - Delete development sandbox

## 🌐 Multilingual Support

The site supports both English and Spanish with automatic language detection and routing:

- **Default Language**: English (`/en/`)
- **Secondary Language**: Spanish (`/es/`)
- **Language Switching**: Dynamic language switcher component
- **SEO Optimization**: Proper hreflang tags and canonical URLs

### Content Structure

- Blog posts support both languages with `.en.md` and `.es.md` extensions
- All UI text is localized through `src/data/i18n.json`
- Automatic language detection based on URL path

## 🪣 AWS Amplify Integration

### S3 Storage

- **Bucket Name**: `portfolio-assets-bucket`
- **Access Level**: Public read access
- **Purpose**: Store portfolio assets, images, and documents

### Available Functions

```typescript
import { uploadToPortfolioBucket, getPortfolioFileUrl } from "../lib/storage";

// Upload a file
const result = await uploadToPortfolioBucket(file, "filename.jpg");

// Get public URL
const url = await getPortfolioFileUrl("filename.jpg");
```

### Setup Requirements

1. Configure AWS credentials
2. Run `npm run amplify:dev` to start development
3. Deploy with `npm run amplify:deploy`

See [AMPLIFY_SETUP.md](docs/AMPLIFY_SETUP.md) for detailed configuration instructions.

## 🎨 Styling & Design

### Tailwind CSS Configuration

- **Custom Theme**: Extended with portfolio-specific colors and spacing
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Component Classes**: Reusable utility combinations
- **Dark Mode**: Ready for future implementation

### Design System

- **Typography**: Inter font family with proper hierarchy
- **Colors**: Professional blue and gray palette
- **Spacing**: Consistent 4px base unit system
- **Components**: Accessible, semantic HTML structure

## 📝 Content Management

### Blog Posts

- **Location**: `src/content/blog/`
- **Format**: Markdown with frontmatter
- **Features**: Automatic collection, filtering, and pagination
- **Multilingual**: Separate files for each language

### Featured Projects

Mark projects as featured by adding to frontmatter:

```yaml
---
title: Sample Project
description: A simple example
featured: true
order: 10
heroImage: /assets/images/sample.jpg
tags: [JavaScript, Astro]
---
```

### Certifications

Manage certifications in `src/data/certifications.json`:

```json
{
  "id": "aws-saa",
  "nameKey": "certifications.names.awsSAA.name",
  "issuerKey": "certifications.names.awsSAA.issuer",
  "issueDate": "2024-01-15",
  "credentialUrl": "https://aws.amazon.com/verification",
  "badgeImage": "/assets/images/aws-saa-badge.svg"
}
```

## 🧪 Testing

### Test Structure

- **Unit Tests**: Jest with TypeScript support
- **Test Files**: Located in `src/utils/__tests__/`
- **Coverage**: HTML reports generated in `coverage/` directory
- **Type Checking**: Integrated with build process

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

## 🚀 Deployment

### Static Hosting

The site generates static files in the `dist/` directory, suitable for:

- **Netlify** - Automatic deployments from Git
- **Vercel** - Edge functions and global CDN
- **AWS S3 + CloudFront** - Scalable static hosting
- **GitHub Pages** - Free hosting for public repositories

### AWS Amplify Hosting

- **Automatic Builds**: Triggered by Git pushes
- **Environment Variables**: Configured in Amplify console
- **Custom Domains**: Support for custom domain configuration
- **SSL Certificates**: Automatic HTTPS with Let's Encrypt

## 🔧 Configuration

### Environment Variables

```bash
# AWS Amplify (configured in .env or Amplify console)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
```

### TypeScript Configuration

- **Strict Mode**: Enabled for maximum type safety
- **Path Mapping**: Configured for clean imports
- **Target**: ES2022 for modern JavaScript features
- **Module Resolution**: Node.js compatible

## 📚 Documentation

- **[AMPLIFY_SETUP.md](docs/AMPLIFY_SETUP.md)** - AWS Amplify configuration guide
- **[Authoring Guide](docs/authoring.md)** - Content creation guidelines
- **Code Comments** - Inline documentation for complex functions
- **Type Definitions** - Comprehensive TypeScript interfaces

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make changes with proper TypeScript types
4. Add tests for new functionality
5. Run `npm run build` to ensure everything compiles
6. Submit a pull request

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for code quality
- **Prettier**: Consistent code formatting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Astro Team** - For the amazing static site generator
- **Tailwind CSS** - For the utility-first CSS framework
- **AWS Amplify** - For the backend-as-a-service platform
- **TypeScript Team** - For the type-safe JavaScript experience

---

**Built with ❤️ using Astro, Tailwind CSS, TypeScript, and AWS Amplify**
