import * as $ from 'jquery';
import { Settings } from "../model/Settings";
import { HTML } from "../const/HTML";

export class PageSettings {
    private _nextCallback: Function;

    constructor() {
        this.registerListeners();
    }

    private registerListeners() {
        $(HTML.BTN_SETTINGS_NEXT).click(() => {
            if (this._nextCallback) this._nextCallback();
        });
    }

    public getSettings(): Settings {
        let result: Settings = new Settings();

        result.crossoverKeepBadChildChance = +$(HTML.INP_CROSSOVER_CHANCE).val() / 100;
        result.crossoverMinLength = +$(HTML.INP_CROSSOVER_MIN).val() / 100;
        result.crossoverMaxLength = +$(HTML.INP_CROSSOVER_MAX).val() / 100;
        result.mutationChance = +$(HTML.INP_MUTATION_CHANCE).val() / 100;
        result.mutationMinLength = +$(HTML.INP_MUTATION_MIN).val() / 100;
        result.mutationMaxLength = +$(HTML.INP_MUTATION_MAX).val() / 100;
        result.generations = +$(HTML.INP_GENERATIONS).val();
        result.solutions = +$(HTML.INP_SOLUTIONS).val();
        result.persistenceRatio = +$(HTML.INP_PERSISTENCE).val() / 100;
        result.penaltyDistanceMult = +$(HTML.INP_PENALTY_DISTANCE).val();
        result.penaltyOverloadMult = +$(HTML.INP_PENALTY_OVERLOAD).val();

        return result;
    }

    public setSettings(settings: Settings) {
        $(HTML.INP_CROSSOVER_CHANCE).val(this.f(settings.crossoverKeepBadChildChance * 100));
        $(HTML.INP_CROSSOVER_MIN).val(this.f(settings.crossoverMinLength * 100));
        $(HTML.INP_CROSSOVER_MAX).val(this.f(settings.crossoverMaxLength * 100));
        $(HTML.INP_MUTATION_CHANCE).val(this.f(settings.mutationChance * 100));
        $(HTML.INP_MUTATION_MIN).val(this.f(settings.mutationMinLength * 100));
        $(HTML.INP_MUTATION_MAX).val(this.f(settings.mutationMaxLength * 100));
        $(HTML.INP_GENERATIONS).val(this.f(settings.generations));
        $(HTML.INP_SOLUTIONS).val(this.f(settings.solutions));
        $(HTML.INP_PERSISTENCE).val(this.f(settings.persistenceRatio * 100));
        $(HTML.INP_PENALTY_DISTANCE).val(this.f(settings.penaltyDistanceMult));
        $(HTML.INP_PENALTY_OVERLOAD).val(this.f(settings.penaltyOverloadMult));
    }

    private f(value: number): number {
        return Math.round(value);
    }

    public setNextCallback(value: Function) {
        this._nextCallback = value;
    }
}