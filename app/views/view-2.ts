import document from "document";
import { Views } from '../views';

let views: Views;
    
/**
 * Sample button click with navigation.
 */
function clickHandler(_evt) {
  console.log("view-2 Button Clicked!");
}

/**
 * Sample keypress handler to navigate backwards.
 */
function keyHandler(evt) {
  if (evt.key === "back") {
    evt.preventDefault();
    views.navigate("view-1");
  }
}

/**
 * When this view is mounted, setup elements and events.
 */
function onMount() {
  let btn:any = document.getElementById("v2-button");
  btn.addEventListener("click", clickHandler);
  document.addEventListener("keypress", keyHandler);
}

export function init(_views) {
  views = _views;
  console.log("view-2 init()");
  onMount();
}
