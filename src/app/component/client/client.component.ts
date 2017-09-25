import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../../service/client.service';
import { ServiceBean } from '../../bean/service.bean';
import { ClientBean } from '../../bean/client.bean';

import { AuthenticationUtil } from '../../util/authentication.util';


@Component({
    selector: 'app-client',
    templateUrl: '../../template/client.html',
    styleUrls: ['../../style/client.css']
})

export class ClientComponent implements OnInit {
    allClient: Object;
    numPagination: number;
    isSave: boolean;
    isUpdate: boolean;
    isDelete: boolean;


    constructor(private service: ClientService,
                private router: Router,
                private auth: AuthenticationUtil) {
        this.init();
        this.initComponent();
    }

    private init() {
        this.numPagination = 0;
    }

    private initComponent() {
        let config = new ServiceBean('http://localhost', '', 8080);
        this.service.setConfig(config);
    }

    private getAllClient() {
        try {
            this.service.getAll((this.numPagination * 5))
            .subscribe(
                result => {

                    if(result.code === 401) {

                        this.auth.logout();
                    }

                    if(result.body.length > 0) {

                        this.allClient = result.body;
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
        this.auth.setProperty('find_client', null);
        this.router.navigate(['/clientedit']);
    }

    public findByName(name: string) {
        try {
            this.service.getByName(name)
            .subscribe(
                result => {

                    if(result.code === 401) {
                        this.auth.logout();
                    }

                    let object = result.body[0];
                    this.auth.setProperty('find_client', object.name);

                    this.router.navigate(['/clientedit']);
                },
                error => {
                    alert('Not exist user.');
                }
            );
        } catch(error) {
            this.auth.logout();
        }
    }

    public deleteByName(name: string) {
        try {
            this.service.deleteByName(name)
            .subscribe(
                result => {

                    if(result.code === 401) {
                        this.auth.logout();
                    }

                    this.auth.setProperty('find_client', null);
                    this.getAllClient();
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
            this.getAllClient();
        } else {

            if(this.numPagination > 0) {

                this.numPagination--;
                this.getAllClient();
            }
        }
    }

    public ngOnInit() {
        this.auth.verifySession();

        if(this.auth.getProperty('isUpdateC')) {

            this.isUpdate = true;
            this.auth.setProperty('isUpdateC', null);
        } else if(this.auth.getProperty('isSaveC')) {

            this.isSave = true;
            this.auth.setProperty('isSaveC', null);
        }

        this.getAllClient();
    }
}
