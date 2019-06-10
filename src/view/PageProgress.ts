import * as $ from 'jquery';
import { HTML } from '../const/HTML';
import { GenerationResult } from '../model/GenerationResult';
import { VRP } from '../model/VRP';
import { Storage } from '../model/Storage';

export class PageProgress {
    private _vrp: VRP;
    private _nextCallback: Function;
    private _penalties: number[] = [];

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
        this._vrp.run().then((result: GenerationResult) => {
            Storage.bestSolution = result;
        });
    }

    public addSolution(generation: GenerationResult) {
        $('#table-generation tr:last').after(`<tr><td>${generation.id}</td><td>${generation.bestSolution.penalty}</td><td>${generation.distance}</td></tr>`);
    }

    public setNextCallback(value: Function) {
        this._nextCallback = value;
    }
}