import { Problem } from "./Problem";
import { Settings } from "./Settings";
import { GenerationResult } from "./GenerationResult";

export class Storage {
    public static problem: Problem;
    public static settings: Settings;
    public static bestSolution: GenerationResult
}