export class Vector2 {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public getX(): number {
        return this._x;
    }

    public getY(): number {
        return this._y;
    }
}