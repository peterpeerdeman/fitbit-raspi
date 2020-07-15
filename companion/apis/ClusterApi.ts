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

    public async setClusterScale(count: Number) {
        let result = await this.RaspAPI.requestQL({
            query: `mutation($instances:Int!) {
                cluster_scale(instances: $instances) {
                  name
                }
              }`,
            variables: {
                "instances":count
            }
        });
        return result;
    }
}
