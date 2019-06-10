import { ViewLogic } from "./ViewLogic";
import { Chart } from "chart.js";
 
export class ChartProblemViewLogic extends ViewLogic {
    private _chart: Chart;
    private _data: Chart.ChartDataSets[];

    constructor(viewData: HTMLElement) {
        super(viewData);
        this.updateView();
    }

    public setData(data: Chart.ChartDataSets[]) {
        this._data = data;
        this.updateView();
    }

    private updateView() {
        this._chart = new Chart(this.viewData as HTMLCanvasElement, {
            type: "scatter",
            data: {
                datasets: this._data
            },
            options: {
                legend: { display: false },
                layout: {
                    padding: 25
                },
                responsive: true
            }
        });
    }
}