import { HTML } from "../const/HTML";
import { ChartProblemViewLogic } from "./ChartProblemViewLogic";
import { ProblemLoader } from "../util/ProblemLoader";
import { Storage } from "../model/Storage";
import { Problem } from "../model/Problem";
const { dialog } = require('electron').remote;
import * as $ from 'jquery';
import { VRP } from "../model/VRP";
import { Settings } from "../model/Settings";
import { GenerationResult } from "../model/GenerationResult";

export class PageProblem {
    private chartVL: ChartProblemViewLogic;

    constructor() {
        this.chartVL = new ChartProblemViewLogic($(HTML.CHART_PROBLEM).get()[0]);

        this.registerListeners();
    }

    private registerListeners() {
        $(HTML.BTN_LOAD).click(() => {
            dialog.showOpenDialog({ properties: ['openFile'] }, (file: string[]) => {
                this.loadProblem(file[0]);
            });
        });
        $(HTML.BTN_GO).click(() => {
            let settings = new Settings();
            settings.generations = 200;
            settings.solutions = 100;
            settings.mutationChance = 0.05;
            settings.mutationMinLength = 0.01;
            settings.mutationMaxLength = 0.33;
            settings.crossoverKeepBadChildChance = 0.15;
            settings.crossoverMinLength = 0.01;
            settings.crossoverMaxLength = 0.33;
            settings.persistenceRatio = 0.4;
            
            let vrp = new VRP(Storage.problem, settings, (gen: GenerationResult) => {
                console.log(gen);
            });
            vrp.run();
        });
    }

    private loadProblem(file: string) {
        new ProblemLoader(file).load((data: Problem) => {
            Storage.problem = data;
            this.chartVL.setData(data.nodes.map(node => {
                return {
                    x: node.position.x,
                    y: node.position.y
                }
            }));
        });
    }
}