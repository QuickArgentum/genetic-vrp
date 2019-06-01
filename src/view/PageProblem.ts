import { HTML } from "../const/HTML";
import { ChartProblemViewLogic } from "./ChartProblemViewLogic";
import { ProblemLoader } from "../util/ProblemLoader";
import { Storage } from "../model/Storage";
import { Problem } from "../model/Problem";
const { dialog } = require('electron').remote;
import * as $ from 'jquery';

export class PageProblem {
    private chartVL: ChartProblemViewLogic;

    private _nextCallback: Function;

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
        $(HTML.BTN_PROBLEM_NEXT).click(() => {
            if (this._nextCallback) this._nextCallback();
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

    public setNextCallback(value: Function) {
        this._nextCallback = value;
    }
}