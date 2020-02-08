import document from "document";
import { Views } from '../views';

let views: Views;

/**
 * When this view is mounted, setup elements and events.
 */
function onMount() {
    
    let list:any = document.getElementById("homeTileList");
    let items = list.getElementsByClassName("tile-list-item");
    
    items.forEach((element, index) => {
      let touch: RectElement = element.getElementById("touch-me");
      touch.onclick = (evt) => {
        console.log(`touched: ${index}`);
        switch(index) {
          case 0: 
            views.navigate('lights');
            break;
          case 1: 
            views.navigate('thermostat');
            break;
          case 2: 
            views.navigate('solar');
            break;
          default:
            break;
        }
      }
    });

    let carList:any = document.getElementById("carTileList");
    let carListItems = carList.getElementsByClassName("tile-list-item");
    
    carListItems.forEach((element, index) => {
      let touch: RectElement = element.getElementById("touch-me");
      touch.onclick = (evt) => {
        console.log(`touched: ${index}`);
        switch(index) {
          case 0: 
            views.navigate('car');
            break;
          default:
            break;
        }
      }
    });
}

export function init(_views) {
  views = _views;
  console.log("maingallery init()");
  onMount();
}
