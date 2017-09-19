import { Component, AfterContentChecked } from '@angular/core';

import { AuthenticationUtil } from '../util/authentication.util';


@Component({
  selector: 'my-app',
  templateUrl: '../template/app.html'
})

export class AppComponent implements AfterContentChecked {
    isActiveSession: boolean;

    constructor(private auth: AuthenticationUtil) {
    }

    public logout() {
        this.auth.logout();
    }

    public ngAfterContentChecked() {
        this.isActiveSession = this.auth.verifyActiveSession();
    }
}
