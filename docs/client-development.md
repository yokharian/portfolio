# Client-Side Development Guide

This guide explains how to work with the client-side TypeScript code in this portfolio project.

## Overview

The client-side code is located in `src/client/` and includes:

- **Real User Monitoring** (`rum.ts`) - Analytics and performance tracking
- **Language switching is now static** - No JavaScript required, uses pure HTML/CSS

## Development Workflow

### Quick Start

For development with automatic client-side transpilation, run these commands in **two separate terminals**:

**Terminal 1 - Client-side transpilation:**

```bash
npm run transpile:client:watch
```

**Terminal 2 - Astro development server:**

```bash
npm run dev
```

This approach ensures:

- Client-side TypeScript files are automatically transpiled when changed
- Astro development server runs with hot reloading
- Both processes run independently and can be stopped separately
- Clear separation of concerns between transpilation and development server
- Easy debugging of each process individually

### Manual Commands

#### Transpile Client Code Only

```bash
# One-time transpilation
npm run transpile:client

# Watch mode (transpiles on file changes)
npm run transpile:client:watch
```

#### Development Options

```bash
# Option 1: Two terminals (recommended)
# Terminal 1: npm run transpile:client:watch
# Terminal 2: npm run dev

# Option 2: Single terminal (requires manual transpilation)
npm run transpile:client  # Run once before starting dev
npm run dev
```

#### Production Build

```bash
# Transpiles client code + builds Astro site
npm run build
```

## File Structure

```
src/client/
└── rum.ts              # Real User Monitoring

public/assets/js/       # Transpiled JavaScript output
└── rum.js
```

## TypeScript Configuration

Client-side code uses `tsconfig.client.json` with:

- **Target**: ES2020
- **Module**: ES2020
- **Output**: `public/assets/js/`
- **Strict mode**: Enabled
- **Source maps**: Disabled (for production)

## Language Switching (Static Implementation)

The language switching functionality is now **completely static** and works as follows:

1. **Route-based navigation**: Uses `/en` and `/es` URL paths
2. **No JavaScript required**: Pure HTML/CSS implementation
3. **Server-side rendering**: Content is rendered in the correct language by Astro

### Key Features

- **Zero JavaScript**: No client-side code for language switching
- **Route-based**: Each language has its own URL path
- **SEO-friendly**: Clean URLs for search engines
- **Accessibility**: Works with screen readers and keyboard navigation
- **Performance**: No JavaScript overhead for language switching

### HTML Implementation

The language switcher is implemented as static HTML:

```html
<!-- Static language switcher -->
<div class="flex items-center gap-1 text-sm bg-gray-100 rounded-lg p-1">
  <a href="/en/blog" class="px-3 py-1.5 rounded-md font-medium">EN</a>
  <a href="/es/blog" class="px-3 py-1.5 rounded-md font-medium">ES</a>
</div>
```

### URL Structure

```
/en/                    # Home page in English
/es/                    # Home page in Spanish
/en/blog               # Blog in English
/es/blog               # Blog in Spanish
/en/blog/post-slug     # Individual post in English
/es/blog/post-slug     # Individual post in Spanish
/en/certifications     # Certifications in English
/es/certifications     # Certifications in Spanish
```

## Real User Monitoring (RUM)

The only remaining client-side functionality is Real User Monitoring:

### Features

- **Performance tracking**: Core Web Vitals and performance metrics
- **Error monitoring**: JavaScript errors and unhandled promises
- **User interactions**: Button clicks and form submissions
- **Custom events**: Language switches and other user actions

### Configuration

RUM is configured in `src/data/rum-config.json`:

```json
{
  "enabled": false,
  "applicationId": "your-app-id",
  "applicationVersion": "1.0.0",
  "endpoint": "https://dataplane.rum.us-east-1.amazonaws.com"
}
```

## Troubleshooting

### Development Issues

1. **Files not updating**: Make sure you're running `transpile:client:watch` in a separate terminal

2. **TypeScript errors**: Check `tsconfig.client.json` configuration

3. **Build failures**: Ensure all client files are properly transpiled before building

4. **Process management**: Use Ctrl+C to stop each terminal process independently

## Best Practices

1. **Use two terminals** for development to ensure client code is always up to date
2. **Test both languages** to ensure content is properly localized
3. **Use TypeScript strict mode** for better code quality
4. **Keep client code minimal** and focused on essential functionality
5. **Stop both processes** when done developing (Ctrl+C in each terminal)
6. **Test without JavaScript** to ensure language switching works for all users

## Integration with Astro

The client-side code is loaded in the main layout:

```astro
<!-- In Layout.astro -->
<script id="rum-config" type="application/json">{"enabled": false}</script>
<script src="/assets/js/rum.js" defer is:inline></script>
```

Only RUM is loaded as client-side JavaScript. Language switching is handled entirely by Astro's routing system.
