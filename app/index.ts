import { Views } from "./views";

/**
 * Definition for each view in the resources/views folder, and the associated
 * JavaScript module is lazily loaded alongside its view.
 */
const views = new Views(
  [
    //["maingallery", () => import("./views/maingallery")],
    //["lights", () => import("./views/lights")],
    ["view-1", () => import("./views/view-1")],
    ["view-2", () => import("./views/view-2")]
  ],
  "./resources/views/"
);

// Select the first view (view-1) after 1 second
setTimeout(() => {
  views.navigate("view-1");
}, 1000);