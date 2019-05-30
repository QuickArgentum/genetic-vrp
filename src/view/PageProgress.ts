import * as $ from 'jquery';
import { HTML } from '../const/HTML';
import { GenerationResult } from '../model/GenerationResult';

export class PageProgress {
    public addSolution(generation: GenerationResult) {
        $(HTML.DIV_SOLUTION).append(this.createSolutionCard(generation));
    }

    private createSolutionCard(generation: GenerationResult): string {
        let result: string = "";
        result += '<div class="card">';
        result += '<div class="card-body">';
        result += `<h3 class="card-title">Generation: ${generation.id}</h3>`;
        result += `<p class="card-text">Fitness: ${generation.bestSolution.fitness}</p>`;
        result += '</div>';
        result += '</div>';

        return result;
    }
}