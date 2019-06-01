import fs = require("fs");
import { PageProblem } from './view/PageProblem';
import { Navbar } from './view/Navbar';
import { PageProgress } from './view/PageProgress';
import { PageSettings } from './view/PageSettings';
import { Storage } from './model/Storage';
import * as path from "path";
import { Names } from "./const/Names";
import { Settings } from "./model/Settings";
import { PageReport } from "./view/PageReport";

export class Renderer {
    private navbar: Navbar;
    private pageProblem: PageProblem;
    private pageSettings: PageSettings;
    private pageProgress: PageProgress;
    private pageReport: PageReport;

    constructor() {
        this.navbar = new Navbar();
        this.pageProblem = new PageProblem();
        this.pageSettings = new PageSettings();
        this.pageProgress = new PageProgress();
        this.pageReport = new PageReport();
        this.readSettings();

        this.registerListeners();
    }

    private registerListeners() {
        this.pageProblem.setNextCallback(() => {
            this.navbar.openPage(1);
        });
        this.pageSettings.setNextCallback(() => {
            this.handleSettings();
            this.navbar.openPage(2);
            this.pageProgress.start();
        });
        this.pageProgress.setNextCallback(() => {
            this.navbar.openPage(3);
            this.pageReport.drawSolution(Storage.bestSolution.bestSolution, Storage.problem);
        });
    }

    private handleSettings() {
        Storage.settings = this.pageSettings.getSettings();
        
        fs.writeFile(
            path.join(__dirname, Names.SETTINGS),
            JSON.stringify(Storage.settings),
            (err) => {
                if (err) console.error(err);
            }
        );
    }

    private readSettings() {
        if (fs.existsSync(path.join(__dirname, Names.SETTINGS))) {
            fs.readFile(path.join(__dirname, Names.SETTINGS), "utf-8", (err, data) => {
                let json = JSON.parse(data);
                this.pageSettings.setSettings(json as Settings);
            });
        }
    }
}

let renderer = new Renderer();
