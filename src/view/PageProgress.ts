import * as $ from 'jquery';
import { HTML } from '../const/HTML';
import { GenerationResult } from '../model/GenerationResult';
import { VRP } from '../model/VRP';
import { Storage } from '../model/Storage';

export class PageProgress {
    private _vrp: VRP;
    private _nextCallback: Function;

    constructor() {
        this.registerListeners();
    }

    private registerListeners() {
        $(HTML.BTN_PROGRESS_NEXT).click(() => {
            if (this._nextCallback) this._nextCallback();
        });
    }

    public start() {
        this._vrp = new VRP(Storage.problem, Storage.settings, this.addSolution.bind(this));
        Storage.bestSolution = this._vrp.run();
    }

    public addSolution(generation: GenerationResult) {
        $(HTML.DIV_SOLUTION).append(this.createSolutionCard(generation));
    }

    private createSolutionCard(generation: GenerationResult): string {
        let result: string = "";
        result += '\n<div class="card solution">\n';
        result += '<div class="card-body">\n';
        result += `<p class="card-title">Generation: ${generation.id}</p>\n`;
        result += `<p class="card-text">Penalty: ${generation.bestSolution.penalty}</p>\n`;
        result += '</div>\n';
        result += '</div>';

        return result;
    }

    public setNextCallback(value: Function) {
        this._nextCallback = value;
    }
}