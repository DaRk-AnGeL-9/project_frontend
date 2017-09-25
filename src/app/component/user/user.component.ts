import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../service/user.service';
import { ServiceBean } from '../../bean/service.bean';
import { UserBean } from '../../bean/user.bean';

import { AuthenticationUtil } from '../../util/authentication.util';


@Component({
    selector: 'app-user',
    templateUrl: '../../template/user.html',
    styleUrls: ['../../style/user.css']
})

export class UserComponent implements OnInit {
    allUser: Object;
    isAdmin: boolean;
    numPagination: number;
    isSave: boolean;
    isUpdate: boolean;
    isDelete: boolean;


    constructor(private service: UserService,
                private router: Router,
                private auth: AuthenticationUtil) {
        this.init();
        this.initComponent();
    }

    private init() {
        this.isAdmin = this.auth.isAdmin();
        this.numPagination = 0;
    }

    private initComponent() {
        let config = new ServiceBean('http://localhost', '', 8080);
        this.service.setConfig(config);
    }

    private getAllUser() {
        try {
            this.service.getAll((this.numPagination * 5))
            .subscribe(
                result => {

                    if(result.code === 401) {

                        this.auth.logout();
                    }
                    if(result.body.length > 0) {

                        this.allUser = result.body;
                    } else {

                        this.numPagination--;
                    }
                },
                error => {}
            );
        } catch(error) {
            this.auth.logout();
        }
    }


    public addNew() {
        this.auth.setProperty('find_user', null);
        this.router.navigate(['/useredit']);
    }

    public findByUsername(username: string) {
        try {
            this.service.getByUsername(username)
            .subscribe(
                result => {

                    if(result.code === 401) {
                        this.auth.logout();
                    }

                    let object = result.body[0];
                    this.auth.setProperty('find_user', object.username);

                    this.router.navigate(['/useredit']);
                },
                error => {
                    alert('Not exist user.');
                }
            );
        } catch(error) {
            this.auth.logout();
        }
    }

    public deleteByUsername(username: string) {
        try {
            this.service.deleteByUsername(username)
            .subscribe(
                result => {

                    if(result.code === 401) {
                        this.auth.logout();
                    }

                    this.auth.setProperty('find_user', null);
                    this.getAllUser();
                    this.isDelete = true;
                    this.isUpdate = false;
                    this.isSave = false;
                },
                error => {
                    alert('Not exist user.');
                }
            );
        } catch(error) {
            this.auth.logout();
        }
    }

    public changePag(pag: boolean) {
        if(pag) {

            this.numPagination++;
            this.getAllUser();
        } else {

            if(this.numPagination > 0) {
            
                this.numPagination--;
                this.getAllUser();
            }
        }
    }

    public ngOnInit() {
        this.auth.verifySession();

        if(this.auth.getProperty('isUpdateU')) {

            this.isUpdate = true;
            this.auth.setProperty('isUpdateU', null);
        } else if(this.auth.getProperty('isSaveU')) {

            this.isSave = true;
            this.auth.setProperty('isSaveU', null);
        }
        
        this.getAllUser();
    }
}
