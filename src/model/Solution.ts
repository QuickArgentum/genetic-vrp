import { Problem } from "./Problem";
import { Penalty } from "./Penalty";

export class Solution {
    public route: number[] = [];
    public penalty: number;
    public fitness: number;

    public vehicleMarkers: number[] = [];

    constructor(route?: number[]) {
        if (route != null) {
            this.route = route;
        }
    }

    public calculatePenalty(problem: Problem, distanceMult: number, loadMult: number) {
        this.vehicleMarkers = [];

        let load = 0;
        let overload = 0;
        for (let i = 0; i < this.route.length - 1; i++) {
            if (load + problem.nodes[this.route[i]].demand <= problem.capacity) {
                load += problem.nodes[this.route[i]].demand;
            } else if (this.vehicleMarkers.length < problem.vehicles) {
                this.vehicleMarkers.push(i - 1);
                load = problem.nodes[this.route[i]].demand;
            } else {
                overload += problem.nodes[this.route[i]].demand;
            }
        }
        this.vehicleMarkers.push(this.route.length - 1);
        if (overload == 0)
            this.tryReroute(problem, distanceMult, loadMult);

        let p = this.evaluatePenaltyComponents(problem, this.vehicleMarkers);
        this.penalty = Solution.penaltyFunc(p, distanceMult, loadMult);
    }

    private tryReroute(problem: Problem, distanceMult: number, loadMult: number) {
        let markers = [...this.vehicleMarkers];

        for (let i = markers.length - 2; i >= 0; i--) {
            for (let j = 1; markers[i] - j > markers[i - 1]; j++) {
                let newMarkers = [...markers];
                newMarkers[i] -= j;

                let penOld = this.evaluatePenaltyComponents(problem, markers);
                let penNew = this.evaluatePenaltyComponents(problem, newMarkers);

                if (Solution.penaltyFunc(penOld, distanceMult, loadMult) > Solution.penaltyFunc(penNew, distanceMult, loadMult)) {
                    markers = newMarkers;
                } else {
                    break;
                }
            }
        }

        this.vehicleMarkers = markers;
    }

    public calculateDistance(problem: Problem): number {
        return this.evaluatePenaltyComponents(problem, this.vehicleMarkers).distance;
    }

    private evaluatePenaltyComponents(problem: Problem, markers: number[]): Penalty {
        let distance = 0;
        let marker = 0;
        let load = 0;
        let overload = 0;
        
        distance += problem.depot.distanceTo(problem.nodes[this.route[0]]);
        for (let i = 0; i < this.route.length - 2; i++) {
            if (i == markers[marker]) {
                load = problem.nodes[this.route[i]].demand;
                marker++;
                distance += problem.depot.distanceTo(problem.nodes[this.route[i]]);
                distance += problem.depot.distanceTo(problem.nodes[this.route[i + 1]]);
            } else {
                load += problem.nodes[this.route[i]].demand;
                if (load > problem.capacity)
                    overload += problem.nodes[this.route[i]].demand;
                distance += problem.nodes[this.route[i]].distanceTo(
                    problem.nodes[this.route[i + 1]]);
            }
        }
        distance += problem.depot.distanceTo(problem.nodes[this.route[this.route.length - 1]]);
        return new Penalty(distance, overload);
    }

    private static penaltyFunc(penalty: Penalty, distanceMult: number, loadMult: number) {
        return distanceMult * penalty.distance + loadMult * penalty.overload;
    }
}
