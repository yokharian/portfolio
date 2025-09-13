// Shared content and frontmatter types for the portfolio project.
// Prefer importing these interfaces in modules over adding ambient globals.

export interface Frontmatter {
  title: string;
  date?: string | Date;
  tags?: string[];
  lang?: string;
  description?: string;
  draft?: boolean;
  // Any additional frontmatter keys used by content files
  [key: string]: unknown;
}

export interface ContentItem<TMeta extends Frontmatter = Frontmatter> {
  data: TMeta;
  content: string;
  // Path info commonly used in Eleventy collections
  url?: string;
  inputPath?: string;
  outputPath?: string | null;
  // Allow extension fields Eleventy/plugins might inject
  [key: string]: unknown;
}

export interface PageMeta {
  title: string;
  description?: string;
  lang?: string;
  url?: string;
  image?: string;
  // OpenGraph / Twitter fields kept minimal
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export interface SiteMeta {
  name: string;
  title?: string;
  description?: string;
  author?: string;
  locale?: string;
  url?: string;
  // Social/profile links by key
  links?: Record<string, string>;
}
