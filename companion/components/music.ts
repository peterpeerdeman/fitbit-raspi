import * as Commands from '../../common/commands';
import { App } from '../app';
import { MusicApi } from '../apis/MusicApi';

export class Music {
    app: App;
    api: MusicApi;

    constructor(app: App) {
        this.app = app;
        this.api = new MusicApi();
    }

    initialize() {
        this.app.broker.registerHandler(
            Commands.MUSIC_MUSICCONTROL,
            async (command) => {
                console.log('companion command MUSIC_MUSICCONTROL received');
                const results = await this.api.musicControl(command);
                console.log(JSON.stringify(results));
            }
        );

        console.log(`[Companion] Initialized music component`);
    }
}
