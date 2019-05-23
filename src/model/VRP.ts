import { Settings } from "./Settings";
import { Solution } from "./Solution";
import { RandomUtils } from "../util/RandomUtils";
import { Problem } from "./Problem";
import { Roulette } from "./Roulette";
import { Crossover } from "./Crossover";
import { Mutation } from "./Mutation";
import { ArrayUtils } from "../util/ArrayUtils";
import { GenerationResult } from "./GenerationResult";

export class VRP {
    private generation: Solution[] = [];
    private roulette: Roulette;

    private crossover: Crossover;
    private mutation:  Mutation;

    constructor(
        private problem: Problem,
        private settings: Settings,
        private generationCallback: Function
    ) { }

    public run() {
        this.initGeneration();

        for (let i = 0; i < this.settings.generations; i++) {
            console.log(`Generation ${i}`);
            this.roulette = new Roulette();
            
            this.generationCalcFitness();

            let childrenCount: number = Math.floor(this.problem.length * this.settings.persistenceRatio);
            let children: Solution[] = this.generationCreateChildren(childrenCount);

            this.generation.sort((a, b) => { return a.fitness - b.fitness });
            this.generation = this.generation.slice(childrenCount);

            this.generation.splice(0, 0, ...children);

            this.generation.sort((a, b) => { return a.fitness - b.fitness });

            this.finishGeneration();
        }
    }

    private finishGeneration() {
        let result: GenerationResult = new GenerationResult();
        result.bestSolution = this.generation[this.generation.length - 1];
        console.log(result);
        this.generationCallback(result);
    }

    private generationCalcFitness() {
        this.generation.forEach(sol => {
            sol.fitness = 1 / sol.evaluate(this.problem);
        });

        this.generation.forEach(sol => {
            this.roulette.add(sol.fitness);
        });
    }

    private generationCreateChildren(count: number): Solution[] {
        let result: Solution[] = [];

        for (let i = 0; i < count; i++) {
            let parent1: Solution = this.generation[this.roulette.get()];
            let parent2: Solution = this.generation[this.roulette.get()];

            let childRoute: number[];
            childRoute = this.crossover.applyRandom(parent1.route, parent2.route);
            if (RandomUtils.chance(this.settings.mutationChance)) {
                childRoute = this.mutation.applyRandom(childRoute);
            }

            let child: Solution = new Solution(childRoute);
            let childFitness = 1 / child.evaluate(this.problem);
            if (childFitness < parent1.fitness && childFitness < parent2.fitness) {
                if (!RandomUtils.chance(this.settings.crossoverKeepBadChildChance)) {
                    child = ArrayUtils.getRandom([parent1, parent2]);
                }
            }

            result.push(child);
        }

        return result;
    }

    private initGeneration() {
        this.generation.length = 0;
        for (let i = 0; i < this.settings.solutions; i++) {
            this.generation.push(RandomUtils.randomSolution(this.problem.length));
        }

        this.crossover = new Crossover(this.settings.crossoverMinLength, this.settings.crossoverMaxLength);
        this.mutation = new Mutation(this.settings.mutationMinLength, this.settings.mutationMaxLength);
    }
}