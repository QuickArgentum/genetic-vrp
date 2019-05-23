import { app, BrowserWindow } from "electron";
import { ipcMain as ipc } from "electron";
import * as path from "path";
import { WorkerData } from "./model/WorkerData";
import { GenerationResult } from "./model/GenerationResult";

let mainWindow: BrowserWindow;
let worker: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    minHeight: 300,
    minWidth: 400,
  });

  mainWindow.loadFile(path.join(__dirname, "../html/index.html"));
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
 if (mainWindow === null) {
    createWindow();
  }
});

// IPC stuff

ipc.on("create-worker", () => {
  console.log("Creating Worker");
  worker = new BrowserWindow({
    height: 420,
    width: 420,
    show: false,
  });
});

ipc.on("worker-created", () => {
  console.log("Worker Created");
  mainWindow.webContents.send("worker-ready");
});

ipc.on("worker-set-data", (event: any, arg: WorkerData) => {
  console.log("Setting Worker Data");
  worker.webContents.send("set-data", arg);
});

ipc.on("worker-generation-finished", (event: any, arg: GenerationResult) => {
  mainWindow.webContents.send("generation-finished", arg);
});

ipc.on("worker-finished", () => {
  console.log("Worker Finished");
});
