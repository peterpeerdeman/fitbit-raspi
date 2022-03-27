import document from 'document';
import { Views } from '../views';
import * as Commands from '../../common/commands';

let views: Views;

function onMount(state: Raspi.State) {
    const playButton: Element = document.getElementById('btn-play') as Element;
    playButton.onactivate = function (evt) {
        views.broker.sendCommand(Commands.MUSIC_MUSICCONTROL, 'PLAY');
    };

    const stopButton: Element = document.getElementById('btn-stop') as Element;
    stopButton.onactivate = function (evt) {
        views.broker.sendCommand(Commands.MUSIC_MUSICCONTROL, 'STOP');
    };

    const pauseButton: Element = document.getElementById(
        'btn-pause'
    ) as Element;
    pauseButton.onactivate = function (evt) {
        views.broker.sendCommand(Commands.MUSIC_MUSICCONTROL, 'PAUSE');
    };

    const nextButton: Element = document.getElementById('btn-next') as Element;
    nextButton.onactivate = function (evt) {
        views.broker.sendCommand(Commands.MUSIC_MUSICCONTROL, 'NEXT');
    };

    const mixedText: Element = document.getElementById('mixedtext') as Element;

    const headerLabel: Element = mixedText.getElementById('header') as Element;
    const copyLabel: Element = mixedText.getElementById('copy') as Element;

    // Set the text attribute values
    headerLabel.text = state.music.currentsong.title;
    copyLabel.text = state.music.currentsong.subtitle;
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

    const spinner: Element = document.getElementById('spinner') as Element;
    spinner.state = 'enabled';

    views.broker.registerHandler(Commands.UPDATE_UI, (state: Raspi.State) => {
        const spinner: Element = document.getElementById('spinner') as Element;
        spinner.state = 'disabled';
        onMount(state);
    });
    views.broker.sendCommand(Commands.MUSIC_UPDATE_CURRENTSONG);
}
