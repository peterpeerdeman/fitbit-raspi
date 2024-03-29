import * as Commands from '../../common/commands';
import { App } from '../app';
import { ClusterApi } from '../apis/ClusterApi';

export class Cluster {
    app: App;
    api: ClusterApi;

    constructor(app: App) {
        this.app = app;
        this.api = new ClusterApi();
    }

    initialize() {
        this.app.broker.registerHandler(
            Commands.CLUSTER_UPDATE_PORTTABLE,
            async () => {
                console.log(
                    'companion command CLUSTER_UPDATE_PORTTABLE received'
                );
                this.app.resetState();
                this.app.state.page = 'cluster';
                const results = await this.api.getPorttable();
                console.log('porttable: ', JSON.stringify(results));
                this.app.state.cluster.portTable =
                    results.data.cluster.portTable
                        .filter(function (item) {
                            return item.poe_enable != null;
                        })
                        .map(function (item) {
                            return {
                                title: item.name,
                                subtitle: `${item.poe_enable}, ${item.poe_power} W`,
                            };
                        });

                this.app.updateUi();
            }
        );

        this.app.broker.registerHandler(
            Commands.CLUSTERCONTROL_SET,
            async (count) => {
                console.log('companion command CLUSTERCONTROL_SET received');
                const results = await this.api.setClusterScale(count);
                console.log(results);
            }
        );

        console.log(`[Companion] Initialized cluster component`);
    }
}
