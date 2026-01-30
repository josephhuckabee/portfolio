module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("baseUrl", "");
  eleventyConfig.addFilter("stripLeadingSlash", function (url) {
    if (!url) return "";
    return url.replace(/^\//, "");
  });
  eleventyConfig.addFilter("toRoot", function (pageUrl) {
    if (!pageUrl || pageUrl === "/") return "";
    const parts = pageUrl.split("/").filter(Boolean);
    return "../".repeat(parts.length);
  });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/CNAME");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk"]
  };
};
