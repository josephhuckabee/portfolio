module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("baseUrl", "/portfolio");
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/CNAME");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "docs"
    },
    templateFormats: ["njk"]
  };
};
