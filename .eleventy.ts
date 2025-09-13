// TypeScript definitions for Eleventy configuration
// Inline type definitions to avoid module resolution issues

// Frontmatter type definitions
interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description?: string;
  featured?: boolean;
  image?: string;
  lang: string;
  startDate?: string;
  endDate?: string;
}

interface ProjectFrontmatter {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  featured?: boolean;
  order?: number;
  lang: string;
  image?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface EleventyConfig {
  addPassthroughCopy(input: string | Record<string, string>): void;
  setLibrary(name: string, library: any): void;
  addNunjucksFilter(name: string, filter: Function): void;
  addNunjucksAsyncShortcode(name: string, shortcode: Function): void;
  addCollection(name: string, collection: (collectionApi: CollectionApi) => any[]): void;
}

interface CollectionApi {
  getAll(): EleventyItem[];
  getFilteredByGlob(glob: string): EleventyItem[];
}

interface EleventyItem {
  data: {
    tags?: string[];
    startDate?: string | Date;
    date?: string | Date;
    featured?: boolean;
    order?: number;
    [key: string]: any;
  };
  date: string | Date;
  url?: string;
  fileSlug?: string;
  filePathStem?: string;
}

interface EleventyConfigOptions {
  dir: {
    input: string;
    output: string;
    includes: string;
    layouts: string;
    data: string;
  };
  templateFormats?: string[];
  markdownTemplateEngine?: string;
  htmlTemplateEngine?: string;
  dataTemplateEngine?: string;
}

type EleventyConfigFunction = (eleventyConfig: EleventyConfig) => EleventyConfigOptions;

const { filterByLanguage, normalizeLang } = require('./src/utils/language');
const { formatMonthYear, formatRange, relativeFrom, presentLabel } = require('./src/utils/dates');
const { createMd } = require('./src/utils/markdown');
const { t: translate } = require('./src/utils/i18n');
const { formatNumber, formatCurrency } = require('./src/utils/format');
const EleventyImage = require('@11ty/eleventy-img');
const path = require('path');

const eleventyConfig: EleventyConfigFunction = function (eleventyConfig: EleventyConfig) {
  // Copy everything in src/public/ to the site root
  eleventyConfig.addPassthroughCopy({ "src/public": "/" });

  // Use our enhanced Markdown library for Eleventy rendering (Task 3.10 integration)
  eleventyConfig.setLibrary('md', createMd());

  // Minimal Nunjucks date filter used by templates
  eleventyConfig.addNunjucksFilter("date", function (value: string | Date, format: string = "yyyy-LL-dd"): string {
    const d = new Date(value);
    if (isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    if (format === "yyyy-LL-dd") return `${yyyy}-${mm}-${dd}`;
    // Fallback ISO-like
    return `${yyyy}-${mm}-${dd}`;
  });

  // Utility filters
  eleventyConfig.addNunjucksFilter('json', function (obj: any): string {
    try { return JSON.stringify(obj || {}); } catch (e) { return '{}'; }
  });

  // New date/i18n filters
  eleventyConfig.addNunjucksFilter('dateLong', function (value: string | Date, lang: string = 'en'): string {
    return formatMonthYear(value, lang);
  });
  eleventyConfig.addNunjucksFilter('dateRange', function (start: string | Date, end: string | Date, lang: string = 'en'): string {
    return formatRange(start, end, lang);
  });
  eleventyConfig.addNunjucksFilter('relativeFrom', function (value: string | Date, lang: string = 'en'): string {
    return relativeFrom(value, lang);
  });
  eleventyConfig.addNunjucksFilter('presentLabel', function (lang: string = 'en'): string {
    return presentLabel(lang);
  });

  // i18n translation filter
  eleventyConfig.addNunjucksFilter('t', function (key: string, lang: string = 'en', vars: Record<string, any> = {}): string {
    try {
      return translate(key, lang, vars);
    } catch (e) {
      return '';
    }
  });

  // Number formatting filters
  eleventyConfig.addNunjucksFilter('number', function (value: number, lang: string = 'en', options: Record<string, any> = {}): string {
    return formatNumber(value, lang, options);
  });
  eleventyConfig.addNunjucksFilter('currency', function (value: number, currency: string = 'USD', lang: string = 'en'): string {
    return formatCurrency(value, currency, lang);
  });

  // Helper filter to pick items by language in templates
  eleventyConfig.addNunjucksFilter('byLanguage', function (items: any[], lang: string): any[] {
    return filterByLanguage(items, normalizeLang(lang));
  });
  eleventyConfig.addNunjucksFilter('byLanguageOrFallback', function (items: any[], lang: string, fallback: string = 'en'): any[] {
    const l = normalizeLang(lang);
    const f = normalizeLang(fallback);
    const filtered = filterByLanguage(items, l);
    if (filtered && filtered.length) return filtered;
    return filterByLanguage(items, f);
  });

  // Posts collection from Markdown files in src/blog_posts/
  eleventyConfig.addCollection("posts", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob("src/blog_posts/**/*.md");
    // Sort by startDate (desc) if present, otherwise by date
    return items.sort((a, b) => {
      const aData = a.data as PostFrontmatter;
      const bData = b.data as PostFrontmatter;
      const aDate = new Date(aData.startDate || a.date);
      const bDate = new Date(bData.startDate || b.date);
      return bDate.getTime() - aDate.getTime();
    });
  });

  // Projects collections from src/content/projects/
  eleventyConfig.addCollection("projects", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob("src/content/projects/**/*.md");
    return items;
  });
  eleventyConfig.addCollection("projects_en", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob("src/content/projects/**/*.md");
    return filterByLanguage(items, 'en');
  });
  eleventyConfig.addCollection("projects_es", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob("src/content/projects/**/*.md");
    return filterByLanguage(items, 'es');
  });

  // Featured projects collection (Task 5.1)
  // Filters projects with `featured: true`, sorts by `order` (asc) when present, otherwise by date (newest first), and limits to 6.
  eleventyConfig.addCollection("featured_projects", (collectionApi) => {
    const items = collectionApi
      .getFilteredByGlob("src/content/projects/**/*.md")
      .filter((item) => {
        const data = item.data as ProjectFrontmatter;
        return !!(data?.featured);
      });

    const getOrder = (item: any): number | null => {
      const data = item.data as ProjectFrontmatter;
      const val = data?.order;
      const num = val === undefined ? null : Number(val);
      return Number.isFinite(num) ? num : null;
    };
    const getDate = (item: any): Date => {
      const data = item.data as ProjectFrontmatter;
      return new Date(data?.startDate || item.date);
    };

    items.sort((a, b) => {
      const ao = getOrder(a);
      const bo = getOrder(b);
      if (ao !== null && bo !== null) return ao - bo; // smaller order first
      if (ao !== null) return -1; // items with order come before those without
      if (bo !== null) return 1;
      // fallback: newest first by startDate or file date
      return getDate(b).getTime() - getDate(a).getTime();
    });

    return items.slice(0, 6);
  });

  // Responsive image shortcode (Task 5.5)
  eleventyConfig.addNunjucksAsyncShortcode("image", async function (
    src: string, 
    alt: string = "", 
    sizes: string = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw", 
    className: string = "h-40 w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
  ): Promise<string> {
    if (!src) return "";
    try {
      let source = src;
      if (typeof src === "string" && !/^https?:/i.test(src)) {
        if (src.startsWith("/")) {
          source = path.join("src/public", src.replace(/^\//, ""));
        }
      }
      const metadata = await EleventyImage(source, {
        widths: [300, 600, 900],
        formats: ["jpeg"],
        urlPath: "/assets/img/",
        outputDir: "_site/assets/img/",
      });
      const imageAttributes = {
        alt,
        sizes,
        loading: "lazy" as const,
        decoding: "async" as const,
        class: className,
      };
      return EleventyImage.generateHTML(metadata, imageAttributes, { whitespaceMode: "inline" as const, svgPlaceholder: true });
    } catch (err) {
      const fallback = (typeof src === "string" && src) ? src : "/assets/images/sample.jpg";
      return `<img src="${fallback}" alt="${alt}" loading="lazy" decoding="async" class="${className}" />`;
    }
  });

  return {
    dir: {
      input: ".",
      includes: "src/layouts",
      layouts: "src/layouts",
      data: "src/data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

module.exports = eleventyConfig;
