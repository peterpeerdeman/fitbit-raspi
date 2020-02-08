import { LIGHTS_UPDATE_GROUPLIST } from '../../common/commands';
import { RaspAPI } from './RaspAPI'

export class SolarApi {

    private RaspAPI;
    constructor() {
        this.RaspAPI = new RaspAPI();
    }

    public async getOutputs() {
        let result = await this.RaspAPI.request('GET', `solar/output`, undefined);
        return result;
    }
}