import document from 'document';
import { Views } from '../views';
import * as Commands from '../../common/commands';

let views: Views;

function onMount() {
    const stopButton: Element = document.getElementById('btn-stop') as Element;
    console.log(stopButton);
    stopButton.onactivate = function (evt) {
        views.broker.sendCommand(Commands.MUSIC_MUSICCONTROL, 'STOP');
    };

    const pauseButton: Element = document.getElementById(
        'btn-pause'
    ) as Element;
    pauseButton.onactivate = function (evt) {
        views.broker.sendCommand(Commands.MUSIC_MUSICCONTROL, 'PAUSE');
    };

    const playButton: Element = document.getElementById('btn-play') as Element;
    playButton.onactivate = function (evt) {
        views.broker.sendCommand(Commands.MUSIC_MUSICCONTROL, 'PLAY');
    };
}

function onBackButton(evt) {
    if (evt.key === 'back') {
        evt.preventDefault();
        views.navigate('maingallery');
    }
}

export function init(_views: Views) {
    views = _views;
    console.log('music init()');
    onMount();
    // views.broker.registerHandler(Commands.UPDATE_UI, (state: Raspi.State) => {
    //     const spinner: Element = document.getElementById('spinner') as Element;
    //     spinner.state = 'disabled';
    //     onMount(state);
    // });
    // views.broker.sendCommand(Commands.CLUSTER_UPDATE_PORTTABLE);
}
