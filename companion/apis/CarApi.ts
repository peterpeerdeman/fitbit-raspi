import { RaspAPI } from './RaspAPI'

export class CarApi {

    private RaspAPI;
    constructor() {
        this.RaspAPI = new RaspAPI();
    }

    public async getCharge() {
        let result = await this.RaspAPI.request('GET', `car/charge`, undefined);
        return result;
    }
}