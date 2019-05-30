import { Problem } from "./Problem";

export class Solution {
    public route: number[] = [];
    public fitness: number;

    public vehicleMarkers: number[] = [];

    constructor(route?: number[]) {
        if (route != null) {
            this.route = route;
        }
    }

    public calculateFitness(problem: Problem) {
        this.vehicleMarkers = [];

        let load = 0;
        for (let i = 0; i < this.route.length - 1; i++) {
            if (load + problem.nodes[this.route[i]].demand <= problem.capacity) {
                load += problem.nodes[this.route[i]].demand;
            } else {
                this.vehicleMarkers.push(i - 1);
                load = problem.nodes[this.route[i]].demand;
            }
        }
        this.vehicleMarkers.push(this.route.length - 1);
        if (this.vehicleMarkers.length > problem.vehicles) {
            this.fitness = 0;
            console.log("discarding a solution");
            return;
        }
        
        this.tryReroute(problem);

        this.fitness = 1 / this.evalute(problem, this.vehicleMarkers);
    }

    private tryReroute(problem: Problem) {
        let markers = [...this.vehicleMarkers];
        let load: number[] = [];

        for (let i = 0; i < markers.length; i++) {
            load[i] = 0;
            for (let j = markers[i]; j > (i == 0 ? 0 : markers[i - 1]); j--) {
                load[i] += problem.nodes[this.route[j]].demand;
            }
        }

        for (let i = markers.length - 2; i >= 0; i--) {
            for (let j = 1; markers[i] - j > markers[i - 1]; j++) {
                let newMarkers = [...markers];
                newMarkers[i] -= j;
                if (this.evalute(problem, markers) > this.evalute(problem, newMarkers)) {
                    markers = newMarkers;
                } else {
                    break;
                }
            }
        }

        this.vehicleMarkers = markers;
    }

    private evalute(problem: Problem, markers: number[]) {
        let result = 0;
        let load = 0;
        let marker = 0;
        
        result += problem.depot.distanceTo(problem.nodes[this.route[0]]);
        for (let i = 0; i < this.route.length - 2; i++) {
            if (i == markers[marker]) {
                load = problem.nodes[this.route[i]].demand;
                marker++;
                result += problem.depot.distanceTo(problem.nodes[this.route[i]]);
                result += problem.depot.distanceTo(problem.nodes[this.route[i + 1]]);
            } else {
                load += problem.nodes[this.route[i]].demand;
                result += problem.nodes[this.route[i]].distanceTo(
                    problem.nodes[this.route[i + 1]]);
            }

            if (load > problem.capacity) {
                return Number.MAX_VALUE;
            }
        }
        result += problem.depot.distanceTo(problem.nodes[this.route[this.route.length - 1]]);
        return result;
    }
}
