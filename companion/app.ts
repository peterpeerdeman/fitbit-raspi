import * as Commands from "../common/commands";
import { MessageBroker } from '../common/message-broker';

export class App {
    broker: MessageBroker;
    refreshToken = null;
    accessToken = null;
    apiClient = null;
    state: Raspi.State;

    cleanState = {
        page: 'loading',
        lights: {
            groupsData: []
        },
        thermostat: {
            zonesData: []
        },
        solar: {
            outputs: []
        },
        car: {
            charge: {
                title: '',
                subtitle: ''
            }
        },
        cluster: {
            portTable: []
        },
    };

    constructor(broker: MessageBroker) {
        this.broker = broker;
        this.state = this.cleanState;
    }

    //TODO to be removed if state does not have to be inferred anywhere
    getUiState() {
        return this.state;
    }

    resetState() {
        this.state = this.cleanState;
    }

    updateUi() {
        console.log('companion sending updating ui command');
        console.log(this.getUiState());
        this.broker.sendCommand(Commands.UPDATE_UI, this.getUiState());
    }
}
