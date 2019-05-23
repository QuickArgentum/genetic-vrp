export class Vector2 {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public distanceTo(other: Vector2): number {
        return Math.sqrt( Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2) );
    }
}