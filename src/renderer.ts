import { PageProblem } from './view/PageProblem';
import { Navbar } from './view/Navbar';
import { PageProgress } from './view/PageProgress';

export class Renderer {
    private navbar: Navbar;
    private pageProblem: PageProblem;
    private pageProgress: PageProgress;

    constructor() {
        this.navbar = new Navbar();
        this.pageProblem = new PageProblem();
        this.pageProgress = new PageProgress();
    }

    public run() {

    }
}

let renderer = new Renderer();
renderer.run();
