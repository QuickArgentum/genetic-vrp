import { RandomUtils } from "../util/RandomUtils";
import { ArrayUtils } from "../util/ArrayUtils";

export class Crossover {
    constructor(
        private minSwathLen: number,
        private maxSwathLen: number
    ) { }

    public applyRandom(parent1: number[], parent2: number[]): number[] {
        switch(RandomUtils.rangeInt(0, 2)) {
            case 0: return this.orderOne(parent1, parent2);
            case 1: return this.pmx(parent1, parent2);
            case 2: return this.edgeRecombination(parent1, parent2);
        }
    }

    public orderOne(parent1: number[], parent2: number[]): number[] {
        let result: number[] = [];
        let len: number = RandomUtils.rangeInt(this.minSwathLen * parent.length, this.maxSwathLen * parent.length);
        let pos: number = RandomUtils.rangeInt(0, parent1.length - len);

        for (let i = pos; i < pos + len; i++) {
            result[i] = parent1[i];
        }

        let j = 0;
        for (let i = 0; i < parent2.length; i++) {
            if (result.indexOf(parent2[i]) > -1)
                continue;
            if (j > pos && j < pos + len)
                j = pos + len;
            result[j] = parent2[i];
            j++;
        }

        return result;
    }

    public edgeRecombination(parent1: number[], parent2: number[]): number[] {
        function wrap(x: number): number {
            if (x >= parent1.length)
                return 0;
            else if (x < 0)
                return parent1.length - 1;
            else
                return x;
        }

        let result: number[] = [];

        let neighbours: number[][] = [];
        for (let i = 0; i < parent1.length; i++) {
            neighbours[i] = [];
            if (neighbours[i].indexOf(parent1[wrap(i + 1)]) < 0)
                neighbours[i].push(parent1[wrap(i + 1)]);
            if (neighbours[i].indexOf(parent1[wrap(i - 1)]) < 0)
                neighbours[i].push(parent1[wrap(i - 1)]);

            let j = parent2.indexOf(parent1[i]);
            if (neighbours[i].indexOf(parent2[wrap(j + 1)]) < 0)
                neighbours[i].push(parent2[wrap(j + 1)]);
            if (neighbours[i].indexOf(parent2[wrap(j - 1)]) < 0)
                neighbours[i].push(parent2[wrap(j - 1)]);
        }

        let values: number[] = [...parent1];

        let newNode: number = parent1[0];
        do {
            ArrayUtils.remove(values, newNode);
            result.push(newNode);
            
            neighbours.forEach(list => {
                ArrayUtils.remove(list, newNode);
            });
            console.log(newNode);
            if (neighbours[newNode].length == 0) {
                newNode = ArrayUtils.getRandom(values);
            } else {
                let min = 999;
                let minIndices: number[] = [];
                for (let i = 0; i < neighbours[newNode].length; i++) {
                    if (neighbours[neighbours[newNode][i]].length == min) {
                        minIndices.push(neighbours[newNode][i]);
                    } else if (neighbours[neighbours[newNode][i]].length < min) {
                        minIndices.length = 0;
                        minIndices.push(neighbours[newNode][i]);
                        min = neighbours[neighbours[newNode][i]].length;
                    }
                }
                newNode = ArrayUtils.getRandom(minIndices);
            }

        } while (values.length > 0);

        return result;
    }

    public pmx(parent1: number[], parent2: number[]): number[] {
        let result: number[] = [];
        let len: number = RandomUtils.rangeInt(this.minSwathLen * parent.length, this.maxSwathLen * parent.length);
        let pos: number = RandomUtils.rangeInt(0, parent1.length - len);

        for (let i = pos; i < pos + len; i++) {
            result[i] = parent1[i];
        }

        for (let i = pos; i < pos + len; i++) {
            if (result.indexOf(parent2[i]) < 0) {
                let j = i;
                while(result.indexOf(parent1[j]) > -1) {
                    j = parent2.indexOf(parent1[j]);
                }
                result[j] = parent2[i];
            }
        }

        for (let i = 0; i < parent2.length; i++) {
            if (result[i] == null)
                result[i] = parent2[i];
        }

        return result;
    }
}