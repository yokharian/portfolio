module.exports = function (eleventyConfig) {
  // Copy everything in public/ to the site root
  eleventyConfig.addPassthroughCopy({ "public": "/" });

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