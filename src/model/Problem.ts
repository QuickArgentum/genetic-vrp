import { Node } from "../util/Node";

export class Problem {
    public nodes: Node[] = [];
    public depot: Node;
    public vehicleCapacity: number;

    public get length(): number {
        return this.nodes.length;
    }
}