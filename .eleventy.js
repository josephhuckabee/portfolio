module.exports = function (eleventyConfig) {
  const isNetlify = process.env.NETLIFY === "true";
  const baseUrl = isNetlify ? "" : "/portfolio";
  eleventyConfig.addGlobalData("baseUrl", baseUrl);
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
