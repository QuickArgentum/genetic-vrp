import { VRP } from "./model/VRP";
import { ipcRenderer as ipc } from "electron";
import { WorkerData } from "./model/WorkerData";
import { GenerationResult } from "./model/GenerationResult";

let data: WorkerData;
let vrp: VRP;

ipc.on("set-data", (event: any, arg: WorkerData) => {
    data = arg;

    vrp = new VRP(data.problem, data.settings, (gen: GenerationResult) => {
        ipc.send("");
    });

    vrp.run();
    ipc.send("worker-finished");
});

ipc.send("worker-created");
