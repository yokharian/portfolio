// TypeScript definitions for frontmatter schemas

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description?: string;
  featured?: boolean;
  image?: string;
  lang: string;
  startDate?: string;
  endDate?: string;
  [key: string]: any;
}

export interface PageFrontmatter {
  title: string;
  layout: string;
  permalink?: string;
  lang: string;
  [key: string]: any;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  featured?: boolean;
  order?: number;
  lang: string;
  tags?: string[];
  image?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  [key: string]: any;
}

// Union type for all frontmatter types
export type AnyFrontmatter = PostFrontmatter | PageFrontmatter | ProjectFrontmatter;
