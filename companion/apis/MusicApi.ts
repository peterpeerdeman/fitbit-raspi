import { RaspAPI } from './RaspAPI';

export class MusicApi {
    private RaspAPI;
    constructor() {
        this.RaspAPI = new RaspAPI();
    }

    public async getCurrentSong() {
        let result = await this.RaspAPI.requestQL({
            query: `
query {
  music {
    currentSong{
      title
      artist
      duration
      album
    }
  }
} 
`,
        });
        return result;
    }

    public async musicControl(command: String) {
        let result = await this.RaspAPI.requestQL({
            query: `mutation($command:MusicCommand!) {
                music_control(command: $command)
              }`,
            variables: {
                command: command,
            },
        });
        return result;
    }
}
