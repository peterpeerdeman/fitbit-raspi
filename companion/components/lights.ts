import * as Commands from "../../common/commands";
import { App } from '../app';
import { LightsApi } from '../apis/LightsApi'

export class Lights {
  app: App;
  api: LightsApi

  constructor(app: App) {
    this.app = app;
    this.api = new LightsApi();
  }

  initialize() {
    this.app.broker.registerHandler(Commands.LIGHTS_UPDATE_GROUPLIST, async () => {
      console.log('companion command UPDATE_LIGHTS received');
      this.app.resetState();
      this.app.state.page = 'lights';
      const groups = await this.api.getGroups();
      this.app.state.lights.groupsData = groups.map(function (group) {
        return {
          title: group._rawData.name,
          subtitle: 'all: ' + group._rawData.state.all_on + ', any: ' + group._rawData.state.any_on,
          _id: group._id,
        };
      });

      this.app.updateUi();
    });

    this.app.broker.registerHandler(Commands.LIGHTS_GROUP_ON, async (_id) => {
      this.api.lightsOn(_id);      
    });

    this.app.broker.registerHandler(Commands.LIGHTS_GROUP_OFF, async (_id) => {
      this.api.lightsOff(_id);      
    });



    console.log(`[Companion] Initialized lights component`);
  }
}