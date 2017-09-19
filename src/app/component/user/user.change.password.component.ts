
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,
         FormBuilder,
         Validators,
         FormControl } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { ServiceBean } from '../../bean/service.bean';
import { UserBean } from '../../bean/user.bean';

import { AuthenticationUtil } from '../../util/authentication.util';
import { CompareFormUtil } from '../../util/compare.form.util';


@Component({
    selector: 'app-user',
    templateUrl: '../../template/user_password.html',
    styleUrls: ['../../style/user.css']
})

export class UserChangePasswordComponent implements OnInit {
    form: FormGroup;
    user: UserBean;
    findUser: string;
    messageError: string;
    isSave: string;


    constructor(private service: UserService,
                private router: Router,
                private auth: AuthenticationUtil,
                private formBuilder: FormBuilder) {
        this.init();
        this.initComponent();
    }

    private init() {
        this.user = new UserBean('', '', '', 0, '');
    }

    private initComponent() {
        let config = new ServiceBean('http://localhost', '', 8080);
        this.service.setConfig(config);

        this.form = this.formBuilder.group({
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(4)]],
                confirmpassword: ['', [Validators.required, Validators.minLength(4)]]
                }, {
                    validator: CompareFormUtil.MatchPassword
                })
        });
    }

    public changeFile(event: any) {
        if(event.target.files.length > 0) {

            let file = event.target.files[0];
            let reader: FileReader = new FileReader();
            var tagImage = document.getElementById('image');

            reader.onloadend = (e: any) => {
                this.user.image = reader.result;
            }
            file.load = (e: any) => {
                tagImage.setAttribute('src', reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    public onSubmit() {
        try {
            this.service.updatePasswordByUsername(this.user)
            .subscribe(
                result => {

                    if(result.code === 401) {
                        this.auth.logout();
                    }
                    this.auth.setProperty('isUpdateU', true);
                    this.router.navigate(['/user']);
                },
                error => {
                    this.messageError = 'Document cant update.';
                }
            );
        } catch(error) {
            this.auth.logout();
        }
    }

    public ngOnInit() {
        this.auth.verifySession();
    }
}
