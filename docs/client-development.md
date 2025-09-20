# Client-Side Development Guide

This guide explains how to work with the client-side TypeScript code in this portfolio project.

## Overview

The client-side code is located in `src/client/` and includes:

- **Language switching functionality** (`lang-switcher.ts`, `lang-bootstrap.ts`)
- **Internationalization** (`i18n-client.ts`)
- **Real User Monitoring** (`rum.ts`)

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
├── lang-bootstrap.ts    # Language detection and initialization
├── lang-switcher.ts     # Language switching UI interactions
├── i18n-client.ts       # Client-side internationalization
└── rum.ts              # Real User Monitoring

public/assets/js/       # Transpiled JavaScript output
├── lang-bootstrap.js
├── lang-switcher.js
├── i18n-client.js
└── rum.js
```

## TypeScript Configuration

Client-side code uses `tsconfig.client.json` with:

- **Target**: ES2020
- **Module**: ES2020
- **Output**: `public/assets/js/`
- **Strict mode**: Enabled
- **Source maps**: Disabled (for production)

## Language Switching Feature

The language switching functionality works as follows:

1. **`lang-bootstrap.ts`**: Detects initial language from URL, localStorage, or browser
2. **`lang-switcher.ts`**: Handles UI interactions for language switching
3. **`i18n-client.ts`**: Updates text content based on selected language

### Key Features

- **Progressive Enhancement**: Works without JavaScript
- **URL Preservation**: Maintains current page with language parameter
- **Accessibility**: Full keyboard navigation and ARIA support
- **Persistence**: Remembers language choice in localStorage

### HTML Requirements

The language switcher expects these HTML attributes:

```html
<!-- Container -->
<div data-lang-switcher>
  <!-- Language links -->
  <a href="/en/" data-lang-link="en">English</a>
  <a href="/es/" data-lang-link="es">Español</a>
</div>

<!-- Internationalized content -->
<h1 data-i18n-key="title">Default Title</h1>
<img data-i18n-attr="alt:image.alt" src="image.jpg" alt="Default Alt" />
```

## Troubleshooting

### Language Switching Not Working

1. **Check if files are transpiled**:

   ```bash
   npm run transpile:client
   ```

2. **Verify HTML structure**: Ensure `data-lang-link` attributes are present

3. **Check browser console**: Look for JavaScript errors

4. **Clear browser cache**: Hard refresh (Ctrl+F5 / Cmd+Shift+R)

### Development Issues

1. **Files not updating**: Make sure you're running `transpile:client:watch` in a separate terminal

2. **TypeScript errors**: Check `tsconfig.client.json` configuration

3. **Build failures**: Ensure all client files are properly transpiled before building

4. **Process management**: Use Ctrl+C to stop each terminal process independently

## Best Practices

1. **Use two terminals** for development to ensure client code is always up to date
2. **Test language switching** after making changes to client code
3. **Check both languages** to ensure i18n is working correctly
4. **Use TypeScript strict mode** for better code quality
5. **Keep client code minimal** and focused on UI interactions
6. **Stop both processes** when done developing (Ctrl+C in each terminal)

## Integration with Astro

The client-side code is loaded in the main layout:

```astro
<!-- In Layout.astro -->
<script src="/assets/js/lang-bootstrap.js"></script>
<script src="/assets/js/i18n-client.js"></script>
<script src="/assets/js/lang-switcher.js"></script>
<script src="/assets/js/rum.js"></script>
```

The order matters:

1. `lang-bootstrap.js` - Initializes language
2. `i18n-client.js` - Sets up translations
3. `lang-switcher.js` - Enables switching
4. `rum.js` - Analytics (optional)
