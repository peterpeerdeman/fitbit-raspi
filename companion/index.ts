import { settingsStorage } from "settings";
import { MessageBroker } from "../common/message-broker";
import { App } from './app';

import { Lights } from "./components/lights";
import { Thermostat } from "./components/thermostat";

const broker = new MessageBroker('[Companion]');
const app = new App(broker);

const lights = new Lights(app);
const thermostat = new Thermostat(app);

// A user changes settings
settingsStorage.onchange = async (evt) => {
    // do stuff
};

// initialization from companion side
const initialize = async () => {

}

// initialize components
lights.initialize();
thermostat.initialize();

//update ui if necessary
// app.updateUi();