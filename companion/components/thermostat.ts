import * as Commands from "../../common/commands";
import { App } from '../app';
import { ThermostatApi } from '../apis/ThermostatApi'

export class Thermostat {
  app: App;
  api: ThermostatApi

  constructor(app: App) {
    this.app = app;
    this.api = new ThermostatApi();
  }

  initialize() {
    this.app.broker.registerHandler(Commands.THERMOSTAT_UPDATE_ZONESLIST, async () => {
      console.log('companion command THERMOSTAT_UPDATE_ZONESLIST received');
      this.app.resetState();
      this.app.state.page = 'thermostat';
      const zones = await this.api.getZones();
      this.app.state.thermostat.zonesData = zones.map(function (zone) {
        return {
          title: zone.name,
          subtitle: `current: ${zone.current_temperature}\nwanted: ${zone.wanted_temperature}\nhumid: ${zone.humidity}`,
          _id: zone._id,
        };
      });

      this.app.updateUi();
    });

    this.app.broker.registerHandler(Commands.THERMOSTAT_SET_TEMPERATURE, async (_id, temperature) => {
      this.api.setTemperature(_id, temperature);      
    });

    console.log(`[Companion] Initialized ${this.constructor.name}`);
  }
}