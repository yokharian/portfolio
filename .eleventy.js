const {
  filterByLanguage,
  normalizeLang,
} = require("./.cache/tsbuild/src/utils/language.js");
const {
  formatMonthYear,
  formatRange,
  relativeFrom,
  presentLabel,
} = require("./.cache/tsbuild/src/utils/dates.js");
const { parseMarkdown } = require("./.cache/tsbuild/src/utils/markdown.js");
const { t: translate } = require("./.cache/tsbuild/src/utils/i18n.js");
const {
  formatNumber,
  formatCurrency,
} = require("./.cache/tsbuild/src/utils/format.js");
const EleventyImage = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Copy everything in src/public/ to the site root
  eleventyConfig.addPassthroughCopy({ "src/public": "/" });

  // Copy assets to the site root
  eleventyConfig.addPassthroughCopy({ "src/assets": "/assets" });

  // Use our enhanced Markdown library for Eleventy rendering (Task 3.10 integration)
  eleventyConfig.setLibrary(
    "md",
    require("markdown-it")({
      html: true,
      linkify: true,
      typographer: true,
    })
  );

  // Minimal Nunjucks date filter used by templates
  eleventyConfig.addNunjucksFilter(
    "date",
    function (value, format = "yyyy-LL-dd") {
      const d = new Date(value);
      if (isNaN(d.getTime())) return "";
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(d);
    }
  );

  // JSON filter for debugging
  eleventyConfig.addNunjucksFilter("json", function (obj) {
    try {
      return JSON.stringify(obj || {});
    } catch (e) {
      return "{}";
    }
  });

  // New date/i18n filters
  eleventyConfig.addNunjucksFilter("dateLong", function (value, lang = "en") {
    return formatMonthYear(String(value), lang);
  });
  eleventyConfig.addNunjucksFilter(
    "dateRange",
    function (start, end, lang = "en") {
      return formatRange(String(start), end ? String(end) : null, lang);
    }
  );
  eleventyConfig.addNunjucksFilter(
    "relativeFrom",
    function (value, lang = "en") {
      return relativeFrom(String(value), lang);
    }
  );
  eleventyConfig.addNunjucksFilter("presentLabel", function (lang = "en") {
    return presentLabel(lang);
  });

  // i18n translation filter
  eleventyConfig.addNunjucksFilter("t", function (key, lang = "en", vars = {}) {
    try {
      return translate(key, lang, vars);
    } catch (e) {
      return "";
    }
  });

  // Number formatting filters
  eleventyConfig.addNunjucksFilter(
    "formatNumber",
    function (value, options = {}) {
      return formatNumber(value, options);
    }
  );
  eleventyConfig.addNunjucksFilter(
    "formatCurrency",
    function (value, options = {}) {
      return formatCurrency(value, options);
    }
  );

  // Image processing shortcode
  eleventyConfig.addShortcode(
    "image",
    async function (src, alt, className = "", loading = "lazy") {
      if (!src) return "";

      // Resolve image path relative to src/assets
      let imagePath;
      if (src.startsWith("/assets/")) {
        // Handle paths that already include /assets/
        imagePath = `src${src}`;
      } else if (src.startsWith("/")) {
        // Handle other absolute paths
        imagePath = `src/assets${src}`;
      } else {
        // Handle relative paths
        imagePath = `src/assets/${src}`;
      }

      const metadata = await EleventyImage(imagePath, {
        widths: [300, 600, 900, 1200],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "./_site/assets/images/",
        urlPath: "/assets/images/",
      });

      const imageAttributes = {
        alt,
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
        loading,
        decoding: "async",
        class: className,
      };

      return EleventyImage.generateHTML(metadata, imageAttributes);
    }
  );

  // Collections
  eleventyConfig.addCollection("projects", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob(
      "src/content/projects/**/*.md"
    );
    return items;
  });
  eleventyConfig.addCollection("projects_en", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob(
      "src/content/projects/**/*.md"
    );
    return filterByLanguage(items, "en");
  });
  eleventyConfig.addCollection("projects_es", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob(
      "src/content/projects/**/*.md"
    );
    return filterByLanguage(items, "es");
  });

  // Featured projects collection (Task 5.1)
  // Filters projects with `featured: true`, sorts by `order` (asc) when present, otherwise by date (newest first), and limits to 6.
  eleventyConfig.addCollection("featured_projects", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob(
      "src/content/projects/**/*.md"
    );
    return items
      .filter((item) => item.data.featured === true)
      .sort((a, b) => {
        // Sort by order if present, otherwise by date
        if (a.data.order !== undefined && b.data.order !== undefined) {
          return a.data.order - b.data.order;
        }
        return (
          new Date(b.data.date || b.data.startDate) -
          new Date(a.data.date || a.data.startDate)
        );
      })
      .slice(0, 6);
  });

  // Blog posts collection
  eleventyConfig.addCollection("posts", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob("src/blog_posts/**/*.md");
    return items.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Certifications collection
  eleventyConfig.addCollection("certifications", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob(
      "src/data/certifications.json"
    );
    return items[0]?.data || [];
  });

  // RUM Configuration
  eleventyConfig.addGlobalData(
    "rumConfig",
    require("./src/data/rum-config.json")
  );

  // Structured Data
  eleventyConfig.addGlobalData(
    "structuredData",
    require("./src/data/structured-data.json")
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "layouts",
      data: "data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
