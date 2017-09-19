import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,
         FormBuilder,
         Validators,
         FormControl } from '@angular/forms';

import { ClientService } from '../../service/client.service';
import { ServiceBean } from '../../bean/service.bean';
import { ClientBean } from '../../bean/client.bean';

import { AuthenticationUtil } from '../../util/authentication.util';


@Component({
    selector: 'app-client',
    templateUrl: '../../template/client_edit.html',
    styleUrls: ['../../style/client.css']
})

export class ClientEditComponent implements OnInit {
    form: FormGroup;
    client: ClientBean;
    findClient: string;
    messageError: string;
    isSave: string;


    constructor(private service: ClientService,
                private router: Router,
                private auth: AuthenticationUtil,
                private formBuilder: FormBuilder) {
        this.init();
        this.initComponent();
    }

    private init() {
        this.client = new ClientBean('', '', 0, 0, '');
    }

    private initComponent() {
        let config = new ServiceBean('http://localhost', '', 8080);
        this.service.setConfig(config);

        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            status: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            age: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(3)]],
            profession: ['', [Validators.required, Validators.minLength(4)]],
        });
    }

    public insert() {
        try {
            this.service.insert(this.client)
            .subscribe(
                result => {

                    if(result.code === 401) {
                        this.auth.logout();
                    }
                    this.auth.setProperty('isSaveC', true);
                    this.router.navigate(['/client']);
                },
                error => {
                    this.messageError = 'Document cant insert.';
                }
            );
        } catch(error) {
            this.auth.logout();
        }
    }

    public update() {
        try {
            this.service.updateByName(this.client)
            .subscribe(
                result => {

                    if(result.code === 401) {
                        this.auth.logout();
                    }
                    this.auth.setProperty('isUpdateC', true);
                    this.router.navigate(['/client']);
                },
                error => {
                    this.messageError = 'Document cant update.';
                }
            );
        } catch(error) {
            this.auth.logout();
        }
    }

    public onSubmit() {
        if(this.isSave === 's') {
            this.insert();
        } else if(this.isSave === 'u') {
            this.update();
        }
    }

    public ngOnInit() {
        this.auth.verifySession();

        this.findClient = this.auth.getProperty('find_client');
        if(this.findClient) {

            try {
                this.service.getByName(this.findClient)
                .subscribe(
                    result => {

                        if(result.code === 401) {
                            this.auth.logout();
                        }

                        let object = result.body[0];
                        this.client = new ClientBean(object.name, object.status, object.sex, object.age, object.profession);

                        //set the values to update the reactive form.
                        this.form.get('name').setValue(this.client.name);
                        this.form.get('status').setValue(this.client.status);
                        this.form.get('sex').setValue(this.client.sex);
                        this.form.get('age').setValue(this.client.age);
                        this.form.get('profession').setValue(this.client.profession);
                    },
                    error => {
                        //alert('Not exist client.');
                    }
                );
            } catch(error) {
                this.auth.logout();
            }
        }
    }
}
