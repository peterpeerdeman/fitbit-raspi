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
      mixedtext.text = state.thermostat.zonesData[info.index].title;
      mixedtextBody.text = state.thermostat.zonesData[info.index].subtitle;

      const touchArea: Element = tile.getElementById('touch-me') as Element;
      
      touchArea.onclick = function (evt) {
        const showmore: any = tile.getElementById('show-more') as Element;
        if(showmore.style.display == 'none') {
          tile.height = 260;
          showmore.style.display = 'inline';
        } else {
          tile.height = 120;
          showmore.style.display = 'none';
        }
        // views.broker.sendCommand(Commands.LIGHTS_GROUP_ON, state.lights.groupsData[info.index]._id);
      };

      // TODO pretty loopcode that doesnt work :(
      /*const tempbuttons: [Element] = tile.getElementsByClassName('temp-button') as [Element];
      console.log(tempbuttons);
      tempbuttons.forEach(function(button) {
          button.onclick = function(evt) {
            views.broker.sendCommand(Commands.THERMOSTAT_SET_TEMPERATURE, state.thermostat.zonesData[info.index]._id, button.value);
            views.broker.sendCommand(Commands.THERMOSTAT_UPDATE_ZONESLIST);
          }
      });
      */

      const temp15: Element = tile.getElementById("temp15") as Element;
      temp15.onactivate = function(evt) {
        console.log(JSON.stringify(state.thermostat));
        views.broker.sendCommand(Commands.THERMOSTAT_SET_TEMPERATURE, state.thermostat.zonesData[info.index].zoneId, 15);
        views.broker.sendCommand(Commands.THERMOSTAT_UPDATE_ZONESLIST);
      }

      const temp20: Element = tile.getElementById("temp20") as Element;
      temp20.onactivate = function(evt) {
        console.log(JSON.stringify(state.thermostat));
        views.broker.sendCommand(Commands.THERMOSTAT_SET_TEMPERATURE, state.thermostat.zonesData[info.index].zoneId, 20);
        views.broker.sendCommand(Commands.THERMOSTAT_UPDATE_ZONESLIST);
      }

      const temp21: Element = tile.getElementById("temp21") as Element;
      temp21.onactivate = function(evt) {
        console.log(JSON.stringify(state.thermostat));
        views.broker.sendCommand(Commands.THERMOSTAT_SET_TEMPERATURE, state.thermostat.zonesData[info.index].zoneId, 21);
        views.broker.sendCommand(Commands.THERMOSTAT_UPDATE_ZONESLIST);
      }

      // const clearbutton: Element = tile.getElementById('clear-button') as Element;
      // clearbutton.onclick = function(evt) {
      //   views.broker.sendCommand(Commands.THERMOSTAT_CLEAR_TEMPERATURE, state.thermostat.zonesData[info.index]._id);
      // }

    },
  };

  // KNOWN ISSUE: It is currently required that VTList.length be set AFTER VTList.delegate
  VTList.length = state.thermostat.zonesData.length;
}

function onBackButton(evt) {
  if (evt.key === "back") {
    evt.preventDefault();
    views.navigate("maingallery");
  }
}

export function init(_views: Views) {
  console.log("thermostat init()");

  views = _views;

  const spinner: Element = document.getElementById('spinner') as Element;
  spinner.state = "enabled";
  document.addEventListener("keypress", onBackButton);
  views.broker.registerHandler(Commands.UPDATE_UI, (state: Raspi.State) => {
    const spinner: Element = document.getElementById('spinner') as Element;
    spinner.state = "disabled";
    onMount(state);
  })
  views.broker.sendCommand(Commands.THERMOSTAT_UPDATE_ZONESLIST);
}