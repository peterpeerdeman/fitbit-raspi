import * as Commands from "../../common/commands";
import { App } from '../app';
import { CarApi } from '../apis/CarApi'

export class Car {
  app: App;
  api: CarApi

  constructor(app: App) {
    this.app = app;
    this.api = new CarApi();
  }

  initialize() {
    this.app.broker.registerHandler(Commands.CAR_UPDATE_CHARGE, async () => {
      console.log('companion command CAR_UDPATE received');
      this.app.resetState();
      this.app.state.page = 'car';
      const results = await this.api.getCharge();
      this.app.state.car.charge = {
          title: `${results.results[0].series[0].values[0][1]}%`,
          subtitle: `${new Date(results.results[0].series[0].values[0][0]).toLocaleString('nl')}`
      }

      this.app.updateUi();
    });

    console.log(`[Companion] Initialized car component`);
  }
}