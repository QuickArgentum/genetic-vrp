import { Problem } from "./Problem";

export class Solution {
    public route: number[] = [];
    public fitness: number;

    constructor(route?: number[]) {
        if (route != null) {
            this.route = route;
        }
    }

    public evaluate(problem: Problem): number {
        let result: number = 0;
        result += problem.depot.distanceTo(problem.nodes[this.route[0]]);
        for (let i = 0; i < this.route.length - 1; i++) {
            result += problem.nodes[this.route[i]].distanceTo(
                      problem.nodes[this.route[i + 1]]);
        }
        result += problem.depot.distanceTo(problem.nodes[this.route[this.route.length - 1]]);

        return result;
    }
}
