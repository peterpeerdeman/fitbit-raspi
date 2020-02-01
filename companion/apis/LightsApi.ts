import { LIGHTS_UPDATE_GROUPLIST } from '../../common/commands';

export class LightsApi {
    authHeader = 'xxxxx';

    constructor() {
    }

    public async getGroups() {
        let result = await this.request('GET', `lights/groups`, undefined);
        return result;
    }

    public async lightsOn(_id: number) {
        let result = await this.request('GET', `lights/groups/${_id}/on`, undefined);
        return result;
    }

    public async lightsOff(_id: number) {
        let result = await this.request('GET', `lights/groups/${_id}/off`, undefined);
        return result;
    }

    async request(method, endpoint, body) {
        try {
          const fullEndpoint = 'xxxxxxxx' + endpoint;
          console.log(`Making API request: ${method} ${fullEndpoint}`);
    
          let params = {
              method,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.authHeader,
                  'Accept': 'application/json'
              },
              body
          };
    
          if (method !== 'GET' && method !== 'HEAD') {
            params.body = body ? JSON.stringify(body) : '';
          }
    
          let response = await fetch(fullEndpoint, params);
          let text;
          try {
            text = await response.text();
          } catch(error) {
            console.log(`Empty API response: ${method} ${endpoint} ${response.status} ${error}`);
            text = null;
          }
          let data = text ? JSON.parse(text) : null;
          
          console.log(`Response from Spotify API: ${text ? text.substring(1, 150) : null}`)
          
          return data;
        } catch (error) {
          console.log(`API request error: ${method} ${endpoint} ${error}`);
        }
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