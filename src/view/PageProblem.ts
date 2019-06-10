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
            let sets = [];
            let dataset: Chart.ChartDataSets = {};
            dataset.backgroundColor = "cyan";
            dataset.borderColor = "cyan";
            dataset.fill = false;
            dataset.pointStyle = "triangle";
            dataset.pointRadius = 15;
            dataset.pointHoverRadius = 15;
            dataset.data = [{
                x: data.depot.position.x,
                y: data.depot.position.y
            }];
            dataset.label = "Depot";
            sets.push(dataset);
            let nodeSet: Chart.ChartDataSets = {};
            nodeSet.data = data.nodes.map(node => {
                return {
                    x: node.position.x,
                    y: node.position.y
                }
            });
            nodeSet.backgroundColor = "pink";
            sets.push(nodeSet);
            this.chartVL.setData(sets);
            this.setProblemInfo(data);
        });
    }

    private setProblemInfo(problem: Problem) {
        $(HTML.P_PROBLEM).html(`Customers: ${problem.nodes.length}<br>Vehicles: ${problem.vehicles}<br>Capacity: ${problem.capacity}<br>Depot location: [${problem.depot.position.x}, ${problem.depot.position.y}]`);
    }

    public setNextCallback(value: Function) {
        this._nextCallback = value;
    }
}