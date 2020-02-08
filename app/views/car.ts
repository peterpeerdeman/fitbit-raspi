import document from "document";
import { Views } from '../views';
import * as Commands from "../../common/commands";

let views: Views;

/**
 * Sample button click with navigation.
 */
function clickHandler(_evt: Event) {
  // set the temperature
  
  //views.broker.sendCommand(Commands.LIGHTS_GROUP_ON);
  // TODO set temperature
}

/**
 * When this view is mounted, setup elements and events.
 */
function onMount(state: Raspi.State) {

    const mixedtext: Element = document.getElementById('mixedtext') as Element;
    const mixedtextBody: Element = document.getElementById('copy') as Element;

      mixedtext.text = state.car.charge.title;
      mixedtextBody.text = state.car.charge.subtitle;
}

function onBackButton(evt) {
  if (evt.key === "back") {
    evt.preventDefault();
    views.navigate("maingallery");
  }
}

export function init(_views: Views) {
  console.log("car init()");
  views = _views;
  const spinner: Element = document.getElementById('spinner') as Element;
  spinner.state = "enabled";
  document.addEventListener("keypress", onBackButton);
  views.broker.registerHandler(Commands.UPDATE_UI, (state: Raspi.State) => {
    const spinner: Element = document.getElementById('spinner') as Element;
    spinner.state = "disabled";
    onMount(state);
  })
  views.broker.sendCommand(Commands.CAR_UPDATE_CHARGE);
}