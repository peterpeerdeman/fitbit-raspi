import * as Commands from '../../common/commands';
import { App } from '../app';
import { DestinyApi } from '../apis/DestinyApi';
import { totalmem } from 'os';

export class Destiny {
    app: App;
    api: DestinyApi;

    constructor(app: App) {
        this.app = app;
        this.api = new DestinyApi();
    }

    initialize() {
        this.app.broker.registerHandler(
            Commands.DESTINY_UPDATE_CLANMEMBERPRESENCE,
            async () => {
                console.log(
                    'companion command DESTINY_UPDATE_CLANMEMBERPRESENCE received'
                );
                this.app.resetState();
                this.app.state.page = 'destinyonline';
                const results = await this.api.getClanmemberPresence();
                this.app.state.destiny.clanmemberPresence =
                    results.data.destiny.clanmemberPresence.reduce(function (
                        accumulator,
                        item
                    ) {
                        if (item.isOnline) {
                            accumulator.push({
                                title: item.name,
                                subtitle: `${item.timestamp}`,
                            });
                        }
                        return accumulator;
                    },
                    []);

                this.app.updateUi();
            }
        );

        console.log(`[Companion] Initialized destiny component`);
    }
}

