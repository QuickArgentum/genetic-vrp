import * as $ from 'jquery';
import { HTML } from '../const/html';
import { ProblemLoader } from '../util/ProblemLoader';
import { Problem } from '../model/Problem';
import { ChartProblemViewLogic } from './ChartProblemViewLogic';
import { Chart } from "chart.js";

const { dialog } = require('electron').remote;

$("#nav-problem").click(() => {
    console.log("i clickz");
});

$(HTML.BTN_LOAD).click(() => {
    console.log("canis");
    dialog.showOpenDialog({ properties: ['openFile'] }, (file) => {
        new ProblemLoader(file[0]).load((data: Problem) => {
            let vl = new ChartProblemViewLogic($(HTML.CHART_PROBLEM).get()[0]);
            vl.setData(data.nodes.map(node => {
                return {
                    x: node.position.getX(),
                    y: node.position.getY()
                }
            }));
        });
    });
});