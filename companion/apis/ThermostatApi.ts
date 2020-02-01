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
}

      /*
    raspi.ajax('lights/groups', function(groups) {


    var groupsMenu = new UI.Menu({
        sections: [{
            title: 'Rooms',
            items: groups.map(function(group) {
                return {
                    title: group._rawData.name,
                    subtitle: 'all: ' + group._rawData.state.all_on + ', any: ' + group._rawData.state.any_on,
                    _id: group._id,
                };
            })
        }]
    });
    groupsMenu.on('select', function(e) {
        // enable group
        raspi.ajax('lights/groups/' + e.item._id + '/on', function(data) {
            Vibe.vibrate('short');
            groupsMenu.hide();
        });
    });

    groupsMenu.on('longSelect', function(e) {
        // disable group
        raspi.ajax('lights/groups/' + e.item._id + '/off', function(data) {
            Vibe.vibrate('long');
            groupsMenu.hide();
        });
    });
    groupsMenu.show();
    
});
};

*/