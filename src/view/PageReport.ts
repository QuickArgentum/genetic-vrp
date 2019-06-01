import { Solution } from "../model/Solution";
import { ChartResultViewLogic } from "./ChartResultViewLogic";
import { HTML } from "../const/HTML";
import Chart = require("chart.js");
import { Problem } from "../model/Problem";
import * as $ from 'jquery';

export class PageReport {
    private chartVL: ChartResultViewLogic;

    constructor() {
        this.chartVL = new ChartResultViewLogic($(HTML.CHART_REPORT).get()[0]);
    }

    public drawSolution(solution: Solution, problem: Problem) {
        let sets = [];
        for (let i = 0; i < solution.vehicleMarkers.length; i++) {
            let dataset: Chart.ChartDataSets = {};
            dataset.showLine = true;
            dataset.backgroundColor = "pink";
            dataset.lineTension = 0;
            dataset.fill = false;
            let data = [];
            data.push({
                x: problem.depot.position.x,
                y: problem.depot.position.y
            })
            for (let j = solution.vehicleMarkers[i]; j > (i == 0 ? 0 : solution.vehicleMarkers[i - 1]); j--) {
                let point = {
                    x: problem.nodes[solution.route[j]].position.x,
                    y: problem.nodes[solution.route[j]].position.y
                };
                data.push(point);
            }
            data.push({
                x: problem.depot.position.x,
                y: problem.depot.position.y
            })
            dataset.data = data;
            sets.push(dataset);
        }
        this.chartVL.setData(sets);
    }
}