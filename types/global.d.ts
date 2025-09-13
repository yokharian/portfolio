// Global ambient declarations for the portfolio project.
// Keep this file minimal; prefer module-scoped typings where possible.

// Allow importing Markdown/JSON as modules when needed during TS migration.
declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}

// Eleventy image module typing (very light), to avoid implicit any when used from JS until migrated.
declare module "@11ty/eleventy-img" {
  type Metadata = Record<string, Array<{ format: string; width: number; height: number; url: string }>>;
  interface GenerateHtmlOptions {
    whitespaceMode?: "inline" | "block";
    svgPlaceholder?: boolean;
  }
  interface ImageAttributes {
    alt?: string;
    sizes?: string;
    loading?: "lazy" | "eager";
    decoding?: "async" | "sync" | "auto";
    class?: string;
  }
  function Image(source: string, options?: { widths?: number[]; formats?: string[]; urlPath?: string; outputDir?: string }): Promise<Metadata>;
  namespace Image {
    function generateHTML(metadata: Metadata, attrs?: ImageAttributes, options?: GenerateHtmlOptions): string;
  }
  export = Image;
}
