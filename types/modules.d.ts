// Module declarations for JavaScript utility files so TypeScript consumers get types.
// This provides typings for src/utils/content.js which is used across scripts/tests.

// Common primitives used below
interface ProjectFrontmatter {
  title: string;
  description: string;
  employer?: string;
  startDate: string; // ISO date YYYY-MM-DD
  endDate?: string; // ISO date YYYY-MM-DD
  tags: string[];
  heroImage: string;
  language: 'en' | 'es';
  slug?: string;
  featured?: boolean;
  alt?: string;
  // Allow additional keys from content/frontmatter
  [key: string]: unknown;
}

interface DiscoveredProject {
  slug: string;
  filePath: string;
  frontmatter: ProjectFrontmatter;
  content: string;
  html: string;
  language?: 'en' | 'es';
  imageValid?: boolean;
  heroAlt?: string;
  [key: string]: unknown;
}

interface DiscoverProjectsOptions {
  allowHtml?: boolean;
}

// Support common import specifiers used in this repo for the same module.
declare module '../src/utils/content' {
  export function slugify(s: string): string;
  export function discoverProjects(rootDir?: string, options?: DiscoverProjectsOptions): DiscoveredProject[];
}

declare module './src/utils/content' {
  export function slugify(s: string): string;
  export function discoverProjects(rootDir?: string, options?: DiscoverProjectsOptions): DiscoveredProject[];
}

declare module 'src/utils/content' {
  export function slugify(s: string): string;
  export function discoverProjects(rootDir?: string, options?: DiscoverProjectsOptions): DiscoveredProject[];
}
