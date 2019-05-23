import * as $ from 'jquery';
import { HTML } from '../const/html';
import { ProblemLoader } from '../util/ProblemLoader';
import { Problem } from '../model/Problem';
import { ChartProblemViewLogic } from './ChartProblemViewLogic';
import { Storage } from '../model/Storage';
import { ipcRenderer as ipc } from "electron";
import { WorkerData } from '../model/WorkerData';
import { Settings } from '../model/Settings';
import { GenerationResult } from '../model/GenerationResult';
import { VRP } from '../model/VRP';

const { dialog } = require('electron').remote;

$("#nav-problem").click(() => {
    console.log("i clickz");
});

$(HTML.BTN_LOAD).click(() => {
    dialog.showOpenDialog({ properties: ['openFile'] }, (file) => {
        new ProblemLoader(file[0]).load((data: Problem) => {
            Storage.problem = data;
            let vl = new ChartProblemViewLogic($(HTML.CHART_PROBLEM).get()[0]);
            vl.setData(data.nodes.map(node => {
                return {
                    x: node.position.x,
                    y: node.position.y
                }
            }));
        });
    });
});

$(HTML.BTN_GO).click(() => {
    //ipc.send("create-worker");
    console.log("Starting");
    let data: WorkerData = new WorkerData();
    data.problem = Storage.problem;
    data.settings = new Settings();

    data.settings.generations = 200;
    data.settings.solutions = 100;
    data.settings.persistenceRatio = 0.4;
    data.settings.mutationChance = 0.05;
    data.settings.mutationMinLength = 0.01;
    data.settings.mutationMaxLength = 0.33;
    data.settings.crossoverKeepBadChildChance = 0.1;
    data.settings.crossoverMinLength = 0.01;
    data.settings.crossoverMaxLength = 0.33;

    let vrp = new VRP(data.problem, data.settings, (gen: GenerationResult) => {
        //console.log(gen);
    });
    vrp.run();
});

ipc.on("worker-ready", () => {
    let data: WorkerData = new WorkerData();
    data.problem = Storage.problem;
    data.settings = new Settings();

    data.settings.generations = 200;
    data.settings.solutions = 100;
    data.settings.persistenceRatio = 0.4;
    data.settings.mutationChance = 0.05;
    data.settings.mutationMinLength = 2;
    data.settings.mutationMaxLength = Math.floor(data.problem.length / 3);
    data.settings.crossoverKeepBadChildChance = 0.1;
    data.settings.crossoverMinLength = 2;
    data.settings.crossoverMaxLength = Math.floor(data.problem.length / 3);

    ipc.send("worker-set-data", data);
});

ipc.on("generation-finished", (event: any, arg: GenerationResult) => {
    console.log(arg);
});
