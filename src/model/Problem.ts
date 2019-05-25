import { Node } from "../util/Node";

export class Problem {
    public nodes: Node[] = [];
    public depot: Node;
    public capacity: number;
    public vehicles: number;

    public get length(): number {
        return this.nodes.length;
    }
}