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
            height: 600,
            width: 800,
            minHeight: 300,
            minWidth: 400,
        });
      
        this.mainWindow.loadFile(path.join(__dirname, "../html/index.html"));
        this.mainWindow.webContents.openDevTools();
        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });
      }
}

let main = new Main();
