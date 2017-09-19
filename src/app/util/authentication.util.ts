import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationUtil {
    constructor(private router: Router) {
    }

    public putSession(session: any) {
        localStorage.setItem('token', session);
    }

    public tokenSession() {
        let session = JSON.parse(localStorage.getItem('token'));

        if(session !== null) {
            return session.token;
        }
        return null;
    }

    public isAdmin() {
        let session = JSON.parse(localStorage.getItem('token'));

        if(session !== null) {

            if(session.login) {
                return true;
            }
        }
        return false;
    }

    public verifyActiveSession() {
        let session = JSON.parse(localStorage.getItem('token'));

        if(session !== null) {
            return true;
        }
        return false;
    }


    public setProperty(key: string, value: any) {
        let session = JSON.parse(localStorage.getItem('token'));

        if(session !== null) {
            if(!value) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        }
    }

    public getProperty(key: string) {
        let session = JSON.parse(localStorage.getItem('token'));

        if(session !== null) {
            return localStorage.getItem(key);
        }
        return null;
    }


    public verifySession() {
        let session = JSON.parse(localStorage.getItem('token'));

        if(session === null) {
            this.logout();
        }
    }

    public verifySessionLogin() {
        let session = JSON.parse(localStorage.getItem('token'));

        if(session !== null) {
            this.login();
        }
    }


    public logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    public login() {
        this.router.navigate(['/user']);
    }
}
