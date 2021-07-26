import { settingsStorage } from 'settings';

export class RaspAPI {
    private authHeader: string;
    private apiUrl: string;

    constructor() {
        const settings = this.getSettings();
        this.authHeader = settings.authHeader;
        this.apiUrl = settings.apiUrl;

        settingsStorage.onchange = (evt) => {
            const settings = this.getSettings();
            this.authHeader = settings.authHeader;
            this.apiUrl = settings.apiUrl;
        };
    }

    private getSettings() {
        const _apiUrl = settingsStorage.getItem('raspapi_url');
        const _authHeader = settingsStorage.getItem('raspapi_authheader');

        if (_apiUrl && _authHeader) {
            return {
                apiUrl: JSON.parse(_apiUrl).name,
                authHeader: JSON.parse(_authHeader).name,
            };
        } else {
            return {
                apiUrl: '',
                authHeader: '',
            };
        }
    }

    public async request(method, endpoint, body) {
        try {
            const fullEndpoint = `${this.apiUrl}/api/${endpoint}`;
            console.log(`Making API request: ${method} ${fullEndpoint}`);

            let params = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authHeader,
                    Accept: 'application/json',
                },
                body,
            };

            if (method !== 'GET' && method !== 'HEAD') {
                params.body = body ? JSON.stringify(body) : '';
            }

            let response = await fetch(fullEndpoint, params);
            let text;
            try {
                text = await response.text();
            } catch (error) {
                console.log(
                    `Empty API response: ${method} ${endpoint} ${response.status} ${error}`
                );
                text = null;
            }
            let data = text ? JSON.parse(text) : null;
            console.log(
                `Response from RaspAPI: ${text ? text.substring(1, 150) : null}`
            );
            return data;
        } catch (error) {
            console.log(`API request error: ${method} ${endpoint} ${error}`);
        }
    }

    public async requestQL(body) {
        try {
            const fullEndpoint = `${this.apiUrl}/graphql`;
            console.log(`Making API request: ${fullEndpoint}, ${body}`);

            let params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.authHeader,
                    Accept: 'application/json',
                },
                body,
            };

            params.body = body ? JSON.stringify(body) : '';

            let response = await fetch(fullEndpoint, params);
            let text;
            try {
                text = await response.text();
            } catch (error) {
                console.log(
                    `Empty API response: ${fullEndpoint} ${body} ${response.status} ${error}`
                );
                text = null;
            }
            let data = text ? JSON.parse(text) : null;

            return data;
        } catch (error) {
            console.log(`API request error: ${JSON.stringify(body)} ${error}`);
        }
    }
}
