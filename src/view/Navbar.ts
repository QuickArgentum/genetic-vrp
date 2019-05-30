import * as $ from 'jquery';
import { HTML } from '../const/HTML';

export class Navbar {
    private readonly FADE_TIME: number = 250;
    private readonly PAGE_NAVS: string[] = [
        HTML.NAV_PROBLEM,
        HTML.NAV_SETTINGS,
        HTML.NAV_PROGRESS,
        HTML.NAV_REPORT
    ]

    private activePage: number;
    private blocked: boolean = false;

    constructor() {
        this.registerListeners();
        this.initPages();
    }

    private initPages() {
        $("#page-0").hide(0);
        $("#page-1").hide(0);
        $("#page-2").hide(0);
        $("#page-3").hide(0);

        this.activePage = 0;
        this.openPage(0);
    }

    private registerListeners() {
        for (let i = 0; i < this.PAGE_NAVS.length; i++) {
            $(this.PAGE_NAVS[i]).click(() => {
                this.removeNavActive();
                if (!this.blocked)
                    this.openPage(i);
            });
        }
    }

    private removeNavActive() {
        for (let i = 0; i < this.PAGE_NAVS.length; i++) {
            $(this.PAGE_NAVS[i]).removeClass("active");
        }
    }

    private openPage(id: number) {
        this.block();
        this.removeNavActive();
        $(this.PAGE_NAVS[id]).addClass("active");

        $(`#page-${this.activePage}`).fadeOut(this.FADE_TIME, () => {
            $(`#page-${this.activePage}`).hide(0, () => {
                $(`#page-${id}`).fadeIn(this.FADE_TIME, () => {
                    this.unblock();
                });
            });
        });
        this.activePage = id;
    }

    public block() {
        this.blocked = true;
    }

    public unblock() {
        this.blocked = false;
    }
}
