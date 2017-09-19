import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { LoginBean } from '../bean/login.bean';
import { ResponseBean } from '../bean/response.bean';
import { ServiceBean } from '../bean/service.bean';

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
export class AuthenticationService {
    headers: Headers;
    options: RequestOptions;
    bcConfiguration: ServiceBean;

    constructor(private http: Http) {
    }

    private init() {
        this.headers = new Headers({
            'Content-Type': 'application/json', 
            'Accept': 'q=0.8;application/json;q=0.9'
        });

        this.options = new RequestOptions({ headers: this.headers });
    }
    public setConfig(config: ServiceBean) {
        this.bcConfiguration = config;
    }

    public postLogin(dataLogin: LoginBean): Observable<ResponseBean> {
        let body = JSON.stringify(dataLogin);
        let url = this.bcConfiguration.getHostWithApi() + 'login';

        return this.http
            .post(url, body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                console.error(errMsg);

                return Observable.throw(errMsg);
            });
    }
}
