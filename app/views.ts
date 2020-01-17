/// <reference path="./global-types/index.d.ts" />

/**
 * A basic module to simplify navigation within multi-view applications.
 */
import document from "document";

/**
 * Initialize the views module with views from a specific folder.
 * @param {Object[]} _views An array of views containing the view filename excluding
 * its file extension, and an associated JavaScript `import()`.
 * @param {string} _prefix The folder name where the view files reside.
 */
export class Views {
    

    views: Array<[String, Function]>;
    viewsPrefix: string;
    viewsSuffix: string;
    viewSelected: any;

    constructor(_views: Array<[String, Function]>, _prefix: string) {
        this.views = _views;
        this.viewsPrefix = _prefix;
        this.viewsSuffix = ".gui";
    }

    /**
     * Select a specific view by its index. The view's associated JavaScript is
     * loaded and executed, and the current view is replaced by the selected one.
     * @param {number} _index The array position of the view to be selected.
     */
    select(_index: number) {
        console.log(this.views);
        const [viewGUI, viewJSLoader] = this.views[_index];
        this.viewSelected = viewGUI;
        viewJSLoader()
        .then((view) => {
            document.replaceSync(`${this.viewsPrefix}${viewGUI}${this.viewsSuffix}`);
            view.init(this);
        })
        .catch((err) => {
            console.error(err);
            console.error(`Failed to load view JS: ${viewGUI}`);
        });
    };

    /**
     * Navigate to a specific view using its view name.
     * @param {string} _viewName The name of a .gui file, excluding its path or
     * file extension.
     */
    navigate(_viewName) {
        const index = this.views.indexOf(this.views.filter(el => el[0] == _viewName)[0]);
        this.select(index);
    };

    getViewSelected() {
        return this.viewSelected;
    }
}