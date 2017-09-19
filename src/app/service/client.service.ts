import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { ServiceBean } from '../bean/service.bean';
import { ClientBean } from '../bean/client.bean';
import { ResponseBean } from '../bean/response.bean';

import { AuthenticationUtil } from '../util/authentication.util';

import { Observable } from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class ClientService {
    headers: Headers;
    options: RequestOptions;
    bcConfiguration: ServiceBean;

    constructor(private http: Http,
                private auth: AuthenticationUtil) {
        this.initComponent();
    }

    private initComponent() {
        this.headers = new Headers({
            'content-type': 'application/json', 
            'accept': 'q=0.8;application/json;q=0.9',
            'token-x': this.auth.tokenSession()
        });

        this.options = new RequestOptions({ headers: this.headers });
    }
    public setConfig(config: ServiceBean) {
        this.bcConfiguration = config;
    }

    public getAll(numPagination: number): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'client/getAll?pag=' + numPagination;

        this.initComponent();
        return this.http
            .get(url, this.options)
            .map((res: Response) => {
                return res.json();
            });
    }
    public getByName(name: string): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'client/getByName?name=' + name;

        this.initComponent();
        return this.http
            .get(url, this.options)
            .map((res: Response) => {
                return res.json();
            });
    }
    public insert(clientData: ClientBean): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'client/add';
        let body = JSON.stringify(clientData);

        this.initComponent();
        return this.http
            .post(url, body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }
    public updateByName(clientData: ClientBean): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'client/updateByName';
        let body = JSON.stringify(clientData);

        this.initComponent();
        return this.http
            .post(url, body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }
    public deleteByName(name: string): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'client/deleteByName?name=' + name;

        this.initComponent();
        return this.http
            .delete(url, this.options)
            .map((res: Response) => {
                return res.json();
            });
    }
}
