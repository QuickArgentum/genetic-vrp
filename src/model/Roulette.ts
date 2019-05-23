export class Roulette {
    private wheel: number[] = [];

    public add(item: number) {
        if (this.wheel.length == 0) {
            this.wheel.push(item);
        } else {
            this.wheel.push(this.wheel[this.wheel.length - 1] + item);
        }
    }

    public get(): number {
        let result: number;
        let p = Math.random() * this.wheel[this.wheel.length - 1];

        for (let i = 0; i < this.wheel.length; i++) {
            if (p <= this.wheel[i]) {
                result = i;
                break;
            }
        }
        return result;
    }
}