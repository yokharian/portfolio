# Language Switching Architecture

## Overview

This document explains the language switching implementation in the portfolio website and the technical decisions behind the current approach.

## Current Implementation: Route-Based Navigation

The website uses a **route-based language switching system** where each language has its own URL path:

- **English**: `/en/` (e.g., `/en/blog`, `/en/certifications`)
- **Spanish**: `/es/` (e.g., `/es/blog`, `/es/certifications`)

### How It Works

1. **Language Detection**: The system detects the current language from the URL path
2. **Content Rendering**: Astro renders the appropriate language version based on the route
3. **Navigation**: Language switching navigates to the corresponding route with a full page reload

## Technical Decision: Why Route-Based?

### ✅ **Advantages**

1. **Simplicity**: Much simpler to implement and maintain
2. **Performance**: No client-side JavaScript complexity for content switching
3. **SEO-Friendly**: Each language has its own URL, better for search engines
4. **Reliability**: No complex state management or DOM manipulation
5. **Caching**: Better caching strategies per language
6. **Accessibility**: Clear URL structure for screen readers and users
7. **Development Speed**: Faster development and debugging

### ❌ **Trade-offs**

1. **Page Reload**: Language switching requires a full page reload
2. **State Loss**: Any client-side state is lost during language switch
3. **Slightly Slower UX**: Brief loading time during language switch

## Implementation Details

### File Structure

```
src/
├── pages/
│   ├── [lang]/
│   │   ├── index.astro          # Home page
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog listing
│   │   │   └── [slug].astro     # Individual blog posts
│   │   └── certifications.astro # Certifications page
│   └── index.astro              # Redirect to /en/
```

### Content Management

- **Blog Posts**: Separate files for each language (e.g., `post.en.md`, `post.es.md`)
- **Static Content**: Managed through `src/data/i18n.json`
- **URLs**: Automatically generated based on language prefix
- **Language Switcher**: Pure HTML/CSS - no JavaScript required

## Benefits for Development

### 🚀 **Faster Development**

- **No JavaScript**: Zero client-side complexity for language switching
- **Easier Debugging**: Clear separation between languages
- **Simpler Testing**: Each language can be tested independently
- **Better Performance**: No client-side language switching overhead

### 🔧 **Easier Maintenance**

- **Clear Architecture**: Route-based approach is intuitive
- **Reduced Bugs**: Less complex state management means fewer edge cases
- **Better Caching**: Each language route can be cached independently
- **SEO Optimization**: Better search engine indexing per language

### 📱 **Better User Experience**

- **Bookmarkable URLs**: Users can bookmark specific language versions
- **Browser History**: Proper back/forward navigation per language
- **Accessibility**: Clear URL structure for assistive technologies
- **Performance**: Faster initial page loads (no client-side language detection)
