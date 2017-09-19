export class ServiceBean {
    hostUrl: string;
    apiUrl: string;
    portNumber: number;

    constructor(hostUrl: string, apiUrl: string, portNumber: number) {
        this.hostUrl = hostUrl;
        this.apiUrl = apiUrl;
        this.portNumber = portNumber;
    }
    public getHostWithApi(): string {
        return (this.hostUrl + ':' + this.portNumber + '/' + this.apiUrl);
    }
}
