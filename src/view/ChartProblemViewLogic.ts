import { ViewLogic } from "./ViewLogic";
import { Chart } from "chart.js";
 
export class ChartProblemViewLogic extends ViewLogic {
    private _chart: Chart;
    private _data: Chart.ChartPoint[];

    constructor(viewData: HTMLElement) {
        super(viewData);
        this.updateView();
    }

    public setData(data: Chart.ChartPoint[]) {
        this._data = data;
        this.updateView();
    }

    private updateView() {
        this._chart = new Chart(this.viewData as HTMLCanvasElement, {
            type: "scatter",
            data: {
                datasets: [{
                    data: this._data,
                    backgroundColor: "pink"
                }]
            },
            options: {
                legend: { display: false },
                layout: {
                    padding: 50
                }
            }
        });
    }
}