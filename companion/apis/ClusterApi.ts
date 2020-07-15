import { CLUSTER_UPDATE_PORTTABLE } from '../../common/commands';
import { RaspAPI } from './RaspAPI'

export class ClusterApi {

    private RaspAPI;
    constructor() {
        this.RaspAPI = new RaspAPI();
    }

    public async getPorttable() {
        let result = await this.RaspAPI.requestQL({
            query: '{ cluster { portTable { name poe_enable poe_power } } }'
        });
        return result;
    }
}
