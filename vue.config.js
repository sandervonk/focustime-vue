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
  pwa: {
    manifestOptions: {
      name: "FocusTime",
      short_name: "FocusTime",
      start_url: "/focustime-vue/",
      display: "standalone",
      background_color: "#d4edbf",
      theme_color: "#d4edbf",
      screenshots: [
        {
          src: "/og/screenshot/onboard.jpeg",
          type: "image/jpeg",
          sizes: "390x844",
          platform: "narrow",
          label: "Onboarding - Mobile",
        },
        {
          src: "/og/screenshot/app-home.jpeg",
          type: "image/jpeg",
          sizes: "390x844",
          platform: "narrow",
          label: "FocusTime Dashboard - Mobile",
        },
        {
          src: "/og/screenshot/app-session.jpeg",
          type: "image/jpeg",
          sizes: "390x844",
          platform: "narrow",
          label: "Start a Focus Session - Mobile",
        },
        {
          src: "/og/screenshot/signup.jpeg",
          type: "image/jpeg",
          sizes: "390x844",
          platform: "narrow",
          label: "Sign Up for FocusTime - Mobile",
        },
        {
          src: "/og/screenshot/app-create.jpeg",
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
// Q: What should the source of the screenshots be? they're in the public folder, but the public folder is not in the root of the project
// A:

// Previous manifest.json for refrence:
// {
//   "short_name": "FocusTime",
//   "name": "FocusTime - Productivity Scheduler",
//   "icons": [
//     {
//       "src": "./img/icon/favicon-maskable-192x192.png",
//       "type": "image/png",
//       "sizes": "192x192",
//       "purpose": "any maskable"
//     },
//     {
//       "src": "./img/icon/favicon-maskable-256x256.png",
//       "type": "image/png",
//       "sizes": "256x256",
//       "purpose": "any maskable"
//     },
//     {
//       "src": "./img/icon/favicon-maskable-512x512.png",
//       "type": "image/png",
//       "sizes": "512x512",
//       "purpose": "any maskable"
//     },
//     {
//       "src": "./img/icon/favicon.svg",
//       "type": "image/svg+xml",
//       "sizes": "512x512"
//     },
//     {
//       "src": "./img/icon/favicon-192x192.png",
//       "type": "image/png",
//       "sizes": "192x192"
//     },
//     {
//       "src": "./img/icon/favicon-256x256.png",
//       "type": "image/png",
//       "sizes": "256x256"
//     },
//     {
//       "src": "./img/icon/favicon-512x512.png",
//       "type": "image/png",
//       "sizes": "512x512"
//     }
//   ],
//   "id": "/FocusTime/",
//   "start_url": "/FocusTime/",
//   "background_color": "#d4edbf",
//   "display": "standalone",
//   "scope": "/FocusTime/",
//   "theme_color": "#d4edbf",
//   "shortcuts": [
//     {
//       "name": "Get Started With FocusTime",
//       "short_name": "Sign Up",
//       "description": "Sign up for / Log into an account",
//       "url": "/FocusTime/signup.html",
//       "icons": [{ "src": "/FocusTime/img/icon/favicon.png", "sizes": "256x256" }]
//     },
//     {
//       "name": "Open my FocusTime dashboard",
//       "short_name": "Dashboard",
//       "description": "Open the FocusTime dashboard",
//       "url": "/FocusTime/app/",
//       "icons": [{ "src": "/FocusTime/img/icon/favicon.png", "sizes": "256x256" }]
//     }
//   ],
//   "description": "Improve your productivity by scheduling out your time into more meaningful 'focus sessions' with FocusTime.",
//   "screenshots": [
//     {
//       "src": "/og/screenshot/onboard.jpeg",
//       "type": "image/jpeg",
//       "sizes": "390x844",
//       "platform": "narrow",
//       "label": "Onboarding - Mobile"
//     },
//     {
//       "src": "/og/screenshot/app-home.jpeg",
//       "type": "image/jpeg",
//       "sizes": "390x844",
//       "platform": "narrow",
//       "label": "FocusTime Dashboard - Mobile"
//     },
//     {
//       "src": "/og/screenshot/app-session.jpeg",
//       "type": "image/jpeg",
//       "sizes": "390x844",
//       "platform": "narrow",
//       "label": "Start a Focus Session - Mobile"
//     },
//     {
//       "src": "/og/screenshot/signup.jpeg",
//       "type": "image/jpeg",
//       "sizes": "390x844",
//       "platform": "narrow",
//       "label": "Sign Up for FocusTime - Mobile"
//     },
//     {
//       "src": "/og/screenshot/app-create.jpeg",
//       "type": "image/jpeg",
//       "sizes": "390x844",
//       "platform": "narrow",
//       "label": "Create a Task - Mobile"
//     }
//   ],
//   "categories": ["productivity"]
// }
