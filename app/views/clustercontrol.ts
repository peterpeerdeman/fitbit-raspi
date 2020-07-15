import document from "document";
import { Views } from '../views';
import * as Commands from "../../common/commands";

let views: Views;

/**
 * When this view is mounted, setup elements and events.
 */
function onMount(state: Raspi.State) {
    const buttons: Element = document.getElementById('clusterbuttons') as Element;
  
  
    const cluster0: Element = buttons.getElementById("cluster0") as Element;
    cluster0.onactivate = function(evt) {
        views.broker.sendCommand(Commands.CLUSTERCONTROL_SET, 0);
        views.navigate("maingallery");
    }

    const cluster1: Element = buttons.getElementById("cluster1") as Element;
    cluster1.onactivate = function(evt) {
        views.broker.sendCommand(Commands.CLUSTERCONTROL_SET, 1);
        views.navigate("maingallery");
    }

    const cluster2: Element = buttons.getElementById("cluster2") as Element;
    cluster2.onactivate = function(evt) {
        views.broker.sendCommand(Commands.CLUSTERCONTROL_SET, 2);
        views.navigate("maingallery");
    }

    const cluster3: Element = buttons.getElementById("cluster3") as Element;
    cluster3.onactivate = function(evt) {
        views.broker.sendCommand(Commands.CLUSTERCONTROL_SET, 3);
        views.navigate("maingallery");
    }
}

function onBackButton(evt) {
  if (evt.key === "back") {
    evt.preventDefault();
    views.navigate("maingallery");
  }
}

export function init(_views: Views) {
  views = _views;
  console.log("clustercontrol init()");
  
  views.broker.registerHandler(Commands.UPDATE_UI, (state: Raspi.State) => {
    const spinner: Element = document.getElementById('spinner') as Element;
    spinner.state = "disabled";
    onMount(state);
  })
  views.broker.sendCommand(Commands.CLUSTER_UPDATE_PORTTABLE);
}
