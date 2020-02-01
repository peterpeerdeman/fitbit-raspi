export class RaspAPI {
    private authHeader: string;

    constructor() {
        this.authHeader = 'xxxxx';
    }
    
    public async request(method, endpoint, body) {
        try {
        const fullEndpoint = 'xxxxx' + endpoint;
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