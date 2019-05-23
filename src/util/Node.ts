import { Vector2 } from "./Vector2";

export class Node {
    public position: Vector2;
    public demand: number;

    public timeWindowStart: number;
    public timeWindowEnd: number;
    public serviceTime: number;

    public distanceTo(other: Node): number {
        return this.position.distanceTo(other.position);
    }
}