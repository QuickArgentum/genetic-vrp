import { ViewLogic } from "./ViewLogic";
import Chart = require("chart.js");

export class ChartResultViewLogic extends ViewLogic {
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
                layout: {
                    padding: 25
                },
                responsive: true
            }
        });
    }
}