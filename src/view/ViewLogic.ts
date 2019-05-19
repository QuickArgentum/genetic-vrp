export class ViewLogic {
    protected viewData: HTMLElement;

    constructor(viewData: HTMLElement) {
        this.viewData = viewData;

        this.registerListeners();
    }

    protected registerListeners() {

    }
}