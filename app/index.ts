import clock, { TickEvent } from 'clock';
import { HeartRateSensor } from "heart-rate";

let document = require("document");

let list = document.getElementById("homeTileList");
let items = list.getElementsByClassName("tile-list-item");

items.forEach((element, index) => {
  let touch: RectElement = element.getElementById("touch-me");
  touch.onclick = (evt) => {
    console.log(`touched: ${index}`);
  }
});



let hrLabel: TextElement = document.getElementById("hrm");

function updateDisplay() {
    const date = new Date();
    hrLabel.text = String(date.getSeconds());
}

// setInterval(updateDisplay, 1000);