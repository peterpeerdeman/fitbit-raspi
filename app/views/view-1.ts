import document from "document";
import { Views } from '../views';

let views: Views;

/**
 * When this view is mounted, setup elements and events.
 */
function onMount() {
    let btn:any = document.getElementById("v1-button");
    btn.addEventListener("click", clickHandler);
    }
    
/**
 * Sample button click with navigation.
 */
function clickHandler(_evt) {
    console.log("view-1 Button Clicked!");
    /* Navigate to another screen */
    views.navigate("view-2");
}

export function init(_views) {
      views = _views;
      console.log("view-1 init()");
      onMount();
}