import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { ServiceBean } from '../bean/service.bean';
import { UserBean } from '../bean/user.bean';
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
export class UserService {
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
        let url = this.bcConfiguration.getHostWithApi() + 'user/getAll?pag=' + numPagination;

        this.initComponent();
        return this.http
            .get(url, this.options)
            .map((res: Response) => {
                return res.json();
            });
    }
    public getByUsername(username: string): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'user/getByUsername?username=' + username;

        this.initComponent();
        return this.http
            .get(url, this.options)
            .map((res: Response) => {
                return res.json();
            });
    }
    public insert(userData: UserBean): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'user/add';
        let body = JSON.stringify(userData);

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
    public updateByUsername(userData: UserBean): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'user/updateByUsername';
        let body = JSON.stringify(userData);

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
    public updatePasswordByUsername(userData: UserBean): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'user/updatePasswordByUsername';
        let body = JSON.stringify(userData);

        this.initComponent();
        return this.http
            .post(url, body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }    public deleteByUsername(username: string): Observable<ResponseBean> {
        let url = this.bcConfiguration.getHostWithApi() + 'user/deleteByUsername?username=' + username;

        this.initComponent();
        return this.http
            .delete(url, this.options)
            .map((res: Response) => {
                return res.json();
            });
    }
}
