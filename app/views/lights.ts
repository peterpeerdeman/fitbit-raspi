import document from "document";
import { Views } from '../views';
import * as Commands from "../../common/commands";

let views: Views;

/**
 * Sample button click with navigation.
 */
function clickHandler(_evt: Event) {
  console.log("button clicked!");
  const target = _evt.target as Element
  target.parent
  for (const value in _evt) {
    console.log(value);

  }
  // turn lights on
  views.broker.sendCommand(Commands.LIGHTS_GROUP_ON);

  // TODO refresh the page
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
        type: "lights-pool",
        index: index
      };
    },
    configureTile: function (tile, info) {
      const mixedtext: Element = tile.getElementById('mixedtext') as Element;
      const mixedtextBody: Element = mixedtext.getElementById('copy') as Element;
      mixedtext.text = state.lights.groupsData[info.index].title;
      mixedtextBody.text = state.lights.groupsData[info.index].subtitle;

      const btnOff: Element = tile.getElementById('btn-off') as Element;
      btnOff.onclick = function (evt) {
        views.broker.sendCommand(Commands.LIGHTS_GROUP_OFF, state.lights.groupsData[info.index]._id);
      };

      const btnOn: Element = tile.getElementById('btn-on') as Element;
      btnOn.onclick = function (evt) {
        views.broker.sendCommand(Commands.LIGHTS_GROUP_ON, state.lights.groupsData[info.index]._id);
      };
    },
  };

  // KNOWN ISSUE: It is currently required that VTList.length be set AFTER VTList.delegate
  VTList.length = state.lights.groupsData.length;
}

function onBackButton(evt) {
  if (evt.key === "back") {
    evt.preventDefault();
    views.navigate("maingallery");
  }
}

export function init(_views: Views) {
  console.log("lights init()");

  views = _views;

  const spinner: Element = document.getElementById('spinner') as Element;
  spinner.state = "enabled";
  document.addEventListener("keypress", onBackButton);
  views.broker.registerHandler(Commands.UPDATE_UI, (state: Raspi.State) => {
    console.log('received data from broker');
    const spinner: Element = document.getElementById('spinner') as Element;
    spinner.state = "disabled";
    onMount(state);
  })
  views.broker.sendCommand(Commands.LIGHTS_UPDATE_GROUPLIST);
}