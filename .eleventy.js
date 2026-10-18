module.exports = function(eleventyConfig) {
  eleventyConfig.on("eleventy.before", () => require("./scripts/build-case-studies.js")());
  // Keep the explicit .html URLs identical on static servers and Vercel.
  eleventyConfig.ignores.add("case-studies/**");
  eleventyConfig.addPassthroughCopy("case-studies/*.html");
  eleventyConfig.addPassthroughCopy("case-studies/*.css");
  eleventyConfig.addPassthroughCopy("case-studies/assets");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("main.js");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("*.jpeg");
  eleventyConfig.addPassthroughCopy("*.gif");

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
