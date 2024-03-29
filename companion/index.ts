import { settingsStorage } from 'settings';
import { MessageBroker } from '../common/message-broker';
import { App } from './app';

import { Lights } from './components/lights';
import { Thermostat } from './components/thermostat';
import { Solar } from './components/solar';
import { Car } from './components/car';
import { Cluster } from './components/cluster';
import { Destiny } from './components/destiny';
import { Music } from './components/music';

const broker = new MessageBroker('[Companion]');
const app = new App(broker);

const lights = new Lights(app);
const thermostat = new Thermostat(app);
const solar = new Solar(app);
const car = new Car(app);
const cluster = new Cluster(app);
const destiny = new Destiny(app);
const music = new Music(app);

// A user changes settings
settingsStorage.onchange = async (evt) => {
    // do stuff
};

// initialization from companion side
const initialize = async () => {};

// initialize components
lights.initialize();
thermostat.initialize();
solar.initialize();
car.initialize();
cluster.initialize();
destiny.initialize();
music.initialize();

//update ui if necessary
// app.updateUi();
