import document from 'document';
import { Views } from './views';
import { MessageBroker } from '../common/message-broker';

const broker = new MessageBroker('[FitBit]');

/**
 * Definition for each view in the resources/views folder, and the associated
 * JavaScript module is lazily loaded alongside its view.
 */
const views = new Views(
    [
        ['car', () => import('./views/car')],
        ['destinyonline', () => import('./views/destinyonline')],
        ['cluster', () => import('./views/cluster')],
        ['clustercontrol', () => import('./views/clustercontrol')],
        ['lights', () => import('./views/lights')],
        ['maingallery', () => import('./views/maingallery')],
        ['solar', () => import('./views/solar')],
        ['thermostat', () => import('./views/thermostat')],
        ['music', () => import('./views/music')],
    ],
    './resources/views/',
    broker
);

// Start the spinner
let spinner: Element = document.getElementById('spinner') as Element;
spinner.state = 'enabled';

// Select the first view (view-1) after 1 second
setTimeout(() => {
    views.navigate('maingallery');
}, 500);
