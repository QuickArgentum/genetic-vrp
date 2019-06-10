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
        let dataset: Chart.ChartDataSets = {};
        dataset.backgroundColor = "cyan";
        dataset.borderColor = "cyan";
        dataset.fill = false;
        dataset.pointStyle = "triangle";
        dataset.pointRadius = 15;
        dataset.pointHoverRadius = 15;
        dataset.data = [{
            x: problem.depot.position.x,
            y: problem.depot.position.y
        }];
        dataset.label = "Depot";
        sets.push(dataset);
        for (let i = 0; i < solution.vehicleMarkers.length; i++) {
            let dataset: Chart.ChartDataSets = {};
            dataset.showLine = true;
            dataset.backgroundColor = "pink";
            dataset.borderColor = "pink";
            dataset.lineTension = 0;
            dataset.fill = false;
            dataset.label = `Vehicle ${i + 1}`;
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

        $(HTML.P_REPORT).html(`Distance: ${solution.calculateDistance(problem)}`);
    }
}