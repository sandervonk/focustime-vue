const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/focustime-vue/" : "/",
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  configureWebpack: {
    plugins: [
      new MiniCssExtractPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public/index.html",
            to: "404.html",
          },
        ],
      }),
    ],
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "me.svonk.focustime-vue",
        // appUserModelId: "me.svonk.focustime-vue",
        productName: "FocusTime Vue",
        icon: "src/assets/icon/favicon/favicon-256x256.png",
      },
    },
  },
  // https://cli.vuejs.org/guide/html-and-static-assets.html#the-public-folder
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      title: "Focustime (Vue)",
    },
  },
  pwa: {
    manifestOptions: {
      name: "FocusTime",
      short_name: "FocusTime",
      display: "standalone",
      background_color: "#d4edbf",
      theme_color: "#d4edbf",
      screenshots: [
        {
          src: "./og/screenshot/onboard.jpeg",
          type: "image/jpeg",
          sizes: "390x844",
          platform: "narrow",
          label: "Onboarding - Mobile",
        },
        {
          src: "./og/screenshot/app-home.jpeg",
          type: "image/jpeg",
          sizes: "390x844",
          platform: "narrow",
          label: "FocusTime Dashboard - Mobile",
        },
        {
          src: "./og/screenshot/app-session.jpeg",
          type: "image/jpeg",
          sizes: "390x844",
          platform: "narrow",
          label: "Start a Focus Session - Mobile",
        },
        {
          src: "./og/screenshot/signup.jpeg",
          type: "image/jpeg",
          sizes: "390x844",
          platform: "narrow",
          label: "Sign Up for FocusTime - Mobile",
        },
        {
          src: "./og/screenshot/app-create.jpeg",
          type: "image/jpeg",
          sizes: "390x844",
          platform: "narrow",
          label: "Create a Task - Mobile",
        },
      ],
      categories: ["productivity"],
    },
  },
};
