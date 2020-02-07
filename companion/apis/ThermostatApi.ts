import { LIGHTS_UPDATE_GROUPLIST } from '../../common/commands';
import { RaspAPI } from './RaspAPI'

export class ThermostatApi {
    private RaspAPI;
    constructor() {
        this.RaspAPI = new RaspAPI();
    }

    public async getZones() {
        let result = await this.RaspAPI.request('GET', `thermostat/zones`, undefined);
        return result;
    }

    public async setTemperature(zoneId: number, temperature: number) {
        let result = await this.RaspAPI.request('POST', `thermostat/zones/${zoneId}/overlay?temperature=${temperature}`, undefined);
        return result;
    }

    public async clearTemperature(zoneId: number) {
        let result = await this.RaspAPI.request('DELETE', `thermostat/zones/${zoneId}/overlay`, undefined);
        return result;
    }
}