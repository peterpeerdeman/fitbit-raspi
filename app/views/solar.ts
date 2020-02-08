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
  var VTList: VirtualTileList<VirtualTileListItemInfo> = document.getElementById('my-tile-list') as VirtualTileList<VirtualTileListItemInfo>;

  /****************************************************************************************************
  * The delegate object is what allows for us to customize tiles in the virtual list.
  * - .getTileInfo should return an object which contains a "type" field, specifying the id
  * of the pool to get the tile from. Other than that, you can put any free-form data
  * you want in there, and it will be passed in to configureTils.
  * - .configureTile takes in the actual VirtualTileListItem, and the info returned from .getTileInfo.
  * This is where you can custom-style the element. Make sure you are styling it correctly
  * for the pool specified in the type field.
  ***************************************************************************************************/
  VTList.delegate = {
    getTileInfo: (index: number) => {
      return {
        type: "items-pool",
        index: index
      };
    },
    configureTile: function (tile, info) {
      const mixedtext: Element = tile.getElementById('mixedtext') as Element;
      const mixedtextBody: Element = mixedtext.getElementById('copy') as Element;
      mixedtext.text = state.solar.outputs[info.index].title;
      mixedtextBody.text = state.solar.outputs[info.index].subtitle;

    },
  };

  // KNOWN ISSUE: It is currently required that VTList.length be set AFTER VTList.delegate
  VTList.length = state.solar.outputs.length;
}

function onBackButton(evt) {
  if (evt.key === "back") {
    evt.preventDefault();
    views.navigate("maingallery");
  }
}

export function init(_views: Views) {
  console.log("solar init()");
  views = _views;
  const spinner: Element = document.getElementById('spinner') as Element;
  spinner.state = "enabled";
  document.addEventListener("keypress", onBackButton);
  views.broker.registerHandler(Commands.UPDATE_UI, (state: Raspi.State) => {
    const spinner: Element = document.getElementById('spinner') as Element;
    spinner.state = "disabled";
    onMount(state);
  })
  views.broker.sendCommand(Commands.SOLAR_UPDATE_OUTPUTSLIST);
}