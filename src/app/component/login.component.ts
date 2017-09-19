import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthenticationService } from '../service/authentication.service';
import { ServiceBean } from '../bean/service.bean';

import { AuthenticationUtil } from '../util/authentication.util';

@Component({
    selector: 'login-component',
    templateUrl: '../template/login.html',
    styleUrls : ['../style/login.css']
})

export class LoginComponent implements OnInit {
    form: FormGroup;
    username: string;
    password: string;
    messageError: string;


    constructor(private service: AuthenticationService,
                private router: Router,
                private auth: AuthenticationUtil,
                private formBuilder: FormBuilder) {
        this.init();
        this.initComponent();
    }

    private init() {
        this.username = '';
        this.password = '';
    }

    private initComponent() {
        let config = new ServiceBean('http://localhost', '', 8080);
        this.service.setConfig(config);
    }

    public login() {
        this.service.postLogin({username: this.username, password:this.password})
            .subscribe(
                result => {

                     let session = {
                        token: result.body.token,
                        login: result.body.login
                    };

                    this.auth.putSession(JSON.stringify(session));
                    this.router.navigate(['/user']);
                },
                error => {
                    this.messageError = 'Incorrect Username or Password.';
                }
            );
    }

    public ngOnInit() {
        this.auth.verifySessionLogin();

        this.form = this.formBuilder.group({
            username: [null, [Validators.required, Validators.minLength(4)]],
            password: [null, [Validators.required, Validators.minLength(4)]]
        });
    }
}
