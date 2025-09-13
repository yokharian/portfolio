const { filterByLanguage, normalizeLang } = require('./src/utils/language');
const { formatMonthYear, formatRange, relativeFrom, presentLabel } = require('./src/utils/dates');
const { createMd } = require('./src/utils/markdown');
const { t: translate } = require('./src/utils/i18n');
const Image = require('@11ty/eleventy-img');
const path = require('path');

module.exports = function (eleventyConfig) {
  // Copy everything in public/ to the site root
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  // Use our enhanced Markdown library for Eleventy rendering (Task 3.10 integration)
  eleventyConfig.setLibrary('md', createMd());

  // Minimal Nunjucks date filter used by templates
  eleventyConfig.addNunjucksFilter("date", function (value, format = "yyyy-LL-dd") {
    const d = new Date(value);
    if (isNaN(d)) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    if (format === "yyyy-LL-dd") return `${yyyy}-${mm}-${dd}`;
    // Fallback ISO-like
    return `${yyyy}-${mm}-${dd}`;
  });

  // New date/i18n filters
  eleventyConfig.addNunjucksFilter('dateLong', function (value, lang = 'en') {
    return formatMonthYear(value, lang);
  });
  eleventyConfig.addNunjucksFilter('dateRange', function (start, end, lang = 'en') {
    return formatRange(start, end, lang);
  });
  eleventyConfig.addNunjucksFilter('relativeFrom', function (value, lang = 'en') {
    return relativeFrom(value, lang);
  });
  eleventyConfig.addNunjucksFilter('presentLabel', function (lang = 'en') {
    return presentLabel(lang);
  });

  // i18n translation filter
  eleventyConfig.addNunjucksFilter('t', function (key, lang = 'en', vars = {}) {
    try {
      return translate(key, lang, vars);
    } catch (e) {
      return '';
    }
  });

  // Helper filter to pick items by language in templates
  eleventyConfig.addNunjucksFilter('byLanguage', function (items, lang) {
    return filterByLanguage(items, normalizeLang(lang));
  });

  // Posts collection from Markdown files in blog_posts/
  eleventyConfig.addCollection("posts", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob("blog_posts/**/*.md");
    // Sort by startDate (desc) if present, otherwise by date
    return items.sort((a, b) => {
      const aDate = new Date(a.data.startDate || a.date);
      const bDate = new Date(b.data.startDate || b.date);
      return bDate - aDate;
    });
  });

  // Projects collections from content/projects/
  eleventyConfig.addCollection("projects", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob("content/projects/**/*.md");
    return items;
  });
  eleventyConfig.addCollection("projects_en", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob("content/projects/**/*.md");
    return filterByLanguage(items, 'en');
  });
  eleventyConfig.addCollection("projects_es", (collectionApi) => {
    const items = collectionApi.getFilteredByGlob("content/projects/**/*.md");
    return filterByLanguage(items, 'es');
  });

  // Featured projects collection (Task 5.1)
  // Filters projects with `featured: true`, sorts by `order` (asc) when present, otherwise by date (newest first), and limits to 6.
  eleventyConfig.addCollection("featured_projects", (collectionApi) => {
    const items = collectionApi
      .getFilteredByGlob("content/projects/**/*.md")
      .filter((item) => !!(item?.data?.featured));

    const getOrder = (item) => {
      const val = item?.data?.order;
      const num = val === undefined ? null : Number(val);
      return Number.isFinite(num) ? num : null;
    };
    const getDate = (item) => new Date(item?.data?.startDate || item.date);

    items.sort((a, b) => {
      const ao = getOrder(a);
      const bo = getOrder(b);
      if (ao !== null && bo !== null) return ao - bo; // smaller order first
      if (ao !== null) return -1; // items with order come before those without
      if (bo !== null) return 1;
      // fallback: newest first by startDate or file date
      return getDate(b) - getDate(a);
    });

    return items.slice(0, 6);
  });

  // Responsive image shortcode (Task 5.5)
  eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt = "", sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw", className = "h-40 w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]") {
    if (!src) return "";
    try {
      let source = src;
      if (typeof src === "string" && !/^https?:/i.test(src)) {
        if (src.startsWith("/")) {
          source = path.join("public", src.replace(/^\//, ""));
        }
      }
      const metadata = await Image(source, {
        widths: [300, 600, 900],
        formats: ["jpeg"],
        urlPath: "/assets/img/",
        outputDir: "_site/assets/img/",
      });
      const imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
        class: className,
      };
      return Image.generateHTML(metadata, imageAttributes, { whitespaceMode: "inline", svgPlaceholder: true });
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