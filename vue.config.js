const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/focustime-vue/" : "/",
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  configureWebpack: {
    plugins: [new MiniCssExtractPlugin()],
  },
  // https://cli.vuejs.org/guide/html-and-static-assets.html#the-public-folder
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      title: "Focustime (Vue)",
    },
    404: {
      // entry for the 404 that mirrors index.html
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
