import { RandomUtils } from "../util/RandomUtils";
import { ArrayUtils } from "../util/ArrayUtils";

export class Mutation {
    constructor(
        private minSwathLen: number,
        private maxSwathLen: number
    ) { }

    public inversion(parent: number[]): number[] {
        let result: number[] = [...parent];
        let len: number = RandomUtils.rangeInt(this.minSwathLen * parent.length, this.maxSwathLen * parent.length);
        let pos: number = RandomUtils.rangeInt(0, parent.length - len);

        for (let i = 0; i < len; i++) {
            result[pos + len - i] = parent[pos + i];
        }

        return result;
    }

    public singleSwap(parent: number[]): number[] {
        let result = [...parent];
        let a: number = RandomUtils.rangeInt(0, parent.length - 1);
        let b: number = 0;
        do { b = RandomUtils.rangeInt(0, parent.length - 1); } while (a == b);

        let temp = result[a];
        result[a] = result[b];
        result[b] = temp;

        return result;
    }

    public scramble(parent: number[]): number[] {
        let result: number[] = [...parent];
        let len: number = RandomUtils.rangeInt(this.minSwathLen * parent.length, this.maxSwathLen * parent.length);
        let pos: number = RandomUtils.rangeInt(0, parent.length - len);

        let subArr: number[] = result.slice(pos, len);
        ArrayUtils.shuffle(subArr);
        result.splice(pos, 0, ...subArr);

        return result;
    }
}