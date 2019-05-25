import * as $ from 'jquery';
import { HTML } from '../const/HTML';

export class Navbar {
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
        this.openPage(0, HTML.NAV_PROBLEM);
    }

    private registerListeners() {
        $(HTML.NAV_PROBLEM).click(() => {
            this.removeNavActive();
            if (!this.blocked)
                this.openPage(0, HTML.NAV_PROBLEM);
        });
        $(HTML.NAV_SETTINGS).click(() => {
            this.removeNavActive();
            if (!this.blocked)
                this.openPage(1, HTML.NAV_SETTINGS);
        });
        $(HTML.NAV_PROGRESS).click(() => {
            this.removeNavActive();
            if (!this.blocked)
                this.openPage(2, HTML.NAV_PROGRESS);
        });
        $(HTML.NAV_REPORT).click(() => {
            if (!this.blocked)
                this.openPage(3, HTML.NAV_REPORT);
        });
    }

    private removeNavActive() {
        $(HTML.NAV_PROBLEM).removeClass("active");
        $(HTML.NAV_SETTINGS).removeClass("active");
        $(HTML.NAV_PROGRESS).removeClass("active");
        $(HTML.NAV_REPORT).removeClass("active");
    }

    private openPage(id: number, nav: string) {
        this.block();
        this.removeNavActive();
        $(nav).addClass("active");

        $(`#page-${this.activePage}`).fadeOut(500, () => {
            $(`#page-${this.activePage}`).hide(0, () => {
                $(`#page-${id}`).show(0, () => {
                    $(`#page-${id}`).fadeIn(500, () => {
                        this.unblock();
                    });
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
