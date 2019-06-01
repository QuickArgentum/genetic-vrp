import { app, BrowserWindow } from "electron";
import * as path from "path";

export class Main {
    private mainWindow: BrowserWindow;

    constructor() {
        this.registerListeners();
    }

    private registerListeners() {
        app.on("ready", this.createWindow);

        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit();
            }
        });
        
        app.on("activate", () => {
            if (this.mainWindow === null) {
                this.createWindow();
            }
        });
    }

    private createWindow() {
        this.mainWindow = new BrowserWindow({
            height: 720,
            width: 1280,
            minHeight: 400,
            minWidth: 500,
        });
      
        this.mainWindow.loadFile(path.join(__dirname, "../html/index.html"));
        this.mainWindow.webContents.openDevTools();
        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });
      }
}

let main = new Main();
