module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./assets");
    eleventyConfig.addWatchTarget("./assets");
    eleventyConfig.addPassthroughCopy("css");

    let markdownIt = require("markdown-it");
    var markdownItAttrs = require('markdown-it-attrs');
    let options = {
      html: true,
      breaks: true,
      linkify: true
    };
    let markdownLib = markdownIt(options).use(markdownItAttrs);
    eleventyConfig.setLibrary("md", markdownLib);

    return {
      passthroughFileCopy: true,
      dir: {
        input: ".",
        includes: "_includes",
        data: "_data",
        output: "_site"
      }

    };
    return {
      passthroughFileCopy: true,
      dir: {
        input: ".",
        includes: "_includes",
        data: "_data",
        output: "_site"
      }

  };
};
