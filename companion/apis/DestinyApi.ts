import { DESTINY_UPDATE_CLANMEMBERPRESENCE } from '../../common/commands';
import { RaspAPI } from './RaspAPI'

export class DestinyApi {

    private RaspAPI;
    constructor() {
        this.RaspAPI = new RaspAPI();
    }

    public async getClanmemberPresence() {
        let result = await this.RaspAPI.requestQL({
            query: 'query { destiny { clanmemberPresence { name isOnline timestamp } } }'
        });
        return result;
    }
}
