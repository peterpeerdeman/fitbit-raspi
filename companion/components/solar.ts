import * as Commands from '../../common/commands';
import { App } from '../app';
import { SolarApi } from '../apis/SolarApi';

export class Solar {
    app: App;
    api: SolarApi;

    constructor(app: App) {
        this.app = app;
        this.api = new SolarApi();
    }

    initialize() {
        this.app.broker.registerHandler(
            Commands.SOLAR_UPDATE_OUTPUTSLIST,
            async () => {
                console.log(
                    'companion command SOLAR_UPDATE_OUTPUTSLIST received'
                );
                this.app.resetState();
                this.app.state.page = 'solar';
                const results = await this.api.getOutputs();
                this.app.state.solar.outputs = results
                    .slice(0, 7)
                    .map(function (item) {
                        return {
                            title: item.date,
                            subtitle: `${item.energyGenerated} Wh, ${item.peakPower} W`,
                        };
                    });

                this.app.updateUi();
            }
        );

        console.log(`[Companion] Initialized solar component`);
    }
}

