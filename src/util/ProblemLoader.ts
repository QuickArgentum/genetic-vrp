import fs = require("fs");
import { Problem } from "../model/Problem";
import { Node } from "./Node";
import { Vector2 } from "./Vector2";

export class ProblemLoader {
    private _path: string;

    constructor(path: string) {
        this._path = path;
    }

    public load(callback: Function) {
        fs.readFile(this._path, "utf-8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                callback(this.readProblem(data));
            }
        })
    }

    private readProblem(data: string): Problem {
        let result: Problem = new Problem;

        let lines: string[] = data.split("\n").filter(line => line[0] != "#");

        lines.forEach(x => {
            let line = x.replace(/\s\s+/g, " ").trim();
            console.log(line);
            let elems: string[] = line.split(" ");
            let node: Node = new Node();

            node.position = new Vector2(+elems[1], +elems[2]);
            node.demand = +elems[3];
            node.timeWindowStart = +elems[4];
            node.timeWindowEnd = +elems[5];
            node.serviceTime = +elems[6];

            if (+elems[0] == 0) {
                result.depot = node;
            } else {
                result.nodes.push(node);
            }
        });

        if (!result.depot) {
            result.depot = result.nodes.shift();
            console.warn("No depot specified in input file, using the first node");
        }

        console.log(result);
        return result;
    }
}