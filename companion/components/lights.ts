import * as Commands from "../../common/commands";
import { App } from '../app';

export class Lights {
    app: App;

  constructor(app: App) {
    this.app = app;
  }
  
  initialize() {
    this.app.broker.registerHandler(Commands.LIGHTS_UPDATE_GROUPLIST, () => {
        console.log('companion command UPDATE_LIGHTS received');
        this.app.resetState();
        this.app.state.page = 'lights';
        this.app.state.lights.groupsData = [{
            'title': 'Blabla 1',
            'subtitle': 'subblaas dfas',
            'groupId': 123
        },{
            'title': 'Blabla 2',
            'subtitle': 'subblabla2',
            'groupId': 3333
        },{
            'title': 'Blabla 3',
            'subtitle': 'subblabla3',
            'groupId': 44
        },{
            'title': 'Blabla 4',
            'subtitle': 'subblablaasdf sadf sf dsaf sadf saf asf adsf 4',
            'groupId': 555
        }]

        this.app.updateUi();
    });
    
    console.log(`[Companion] Initialized lights component`);
  }
}