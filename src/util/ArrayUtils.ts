import { RandomUtils } from "./RandomUtils";

export class ArrayUtils {
    public static remove(array: Array<any>, element: any) {
        let i = array.indexOf(element);
        if (i >= 0){
            array.splice(i, 1);
        }
    }

    public static getRandom(array: Array<any>): any {
        return array[RandomUtils.rangeInt(0, array.length - 1)];
    }

    public static popRandom(array: Array<any>): any {
        let result = this.getRandom(array);
        this.remove(array, result);
        return result;
    }

    public static shuffle(array: Array<any>) {
        let j: number;
        let x: any;
        for (let i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
    }
}