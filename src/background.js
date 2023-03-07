"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: false,
    fullscreenable: true,
    // frame: false,
    // titleBarStyle: "hiddenInset",
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  }).removeMenu();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}
// setup user tasks for taskbar actions
// app.setUserTasks([
//   // new window
//   {
//     program: process.execPath,
//     arguments: "--new-window",
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: "New Window",
//     description: "Open a new FocusTime window",
//   },
//   // create a task -> navigate to /create in the app
//   {
//     // open the app and navigate to /create
//     program: process.execPath,
//     arguments: "--navigate-to-create",
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: "Create Task",
//     description: "Create a new task",
//   },
//   {
//     // open the app and navigate to /session
//     program: process.execPath,
//     arguments: "--navigate-to-session",
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: "Start Focus Session",
//     description: "Start a new focus session",
//   },
//   {
//     // open the app and navigate to /
//     program: process.execPath,
//     arguments: "--navigate-to-home",
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: "Open Task List",
//     description: "Open the task list",
//   },
// ]);
// handle the taskbar actions
// app.on("second-instance", (event, argv) => {
//   // Someone tried to run a second instance, we should focus our window.
//   if (win) {
//     if (win.isMinimized()) win.restore();
//     win.focus();
//   }
//   // handle the taskbar actions
//   if (argv.includes("--new-window")) {
//     createWindow();
//   }
//   // if (argv.includes("--navigate-to-create")) {
//   //   win.loadURL("app://./create");
//   // }
//   // if (argv.includes("--navigate-to-session")) {
//   //   win.loadURL("app://./session");
//   // }
//   // if (argv.includes("--navigate-to-home")) {
//   //   win.loadURL("app://./");
//   // }
// });
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
