const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/focustime-vue/" : "/",
  configureWebpack: {
    plugins: [new MiniCssExtractPlugin()],
  },
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      title: "Focustime (Vue)",
    },
  },
};
