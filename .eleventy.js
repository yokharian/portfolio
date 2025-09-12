const { filterByLanguage, normalizeLang } = require('./src/utils/language');
const { formatMonthYear, formatRange, relativeFrom, presentLabel } = require('./src/utils/dates');
const { createMd } = require('./src/utils/markdown');

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