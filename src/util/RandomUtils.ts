import { Solution } from "../model/Solution";
import { ArrayUtils } from "./ArrayUtils";

export class RandomUtils {
    public static rangeInt(min: number, max: number): number {
        return Math.round(min + max * Math.random());
    }

    public static randomSolution(len: number): Solution {
        let result: Solution = new Solution();

        for (let i = 0; i < len; i++) {
            result.route.push();
        }
        ArrayUtils.shuffle(result.route);
        return result;
    }
}