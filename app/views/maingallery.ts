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
          case 3:
            views.navigate('music');
            break;
          default:
            break;
        }
      }
    });

    let serverList:any = document.getElementById("serverTileList");
    let serverListItems = serverList.getElementsByClassName("tile-list-item");

    serverListItems.forEach((element, index) => {
      let touch: RectElement = element.getElementById("touch-me");
      touch.onclick = (evt) => {
        console.log(`touched: ${index}`);
        switch(index) {
          case 0:
            views.navigate('cluster');
            break;
          case 1:
            views.navigate('scaling');
            break;
          case 2:
            views.navigate('servers');
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
    
    let workList:any = document.getElementById("workTileList");
    let workListItems = workList.getElementsByClassName("tile-list-item");

    workListItems.forEach((element, index) => {
      let touch: RectElement = element.getElementById("touch-me");
      touch.onclick = (evt) => {
        console.log(`touched: ${index}`);
        switch(index) {
          case 0: 
            views.navigate('announcements');
            break;
          case 1: 
            views.navigate('work-servers');
            break;
          case 2: 
            views.navigate('team');
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
