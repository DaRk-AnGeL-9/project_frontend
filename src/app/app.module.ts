import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent }  from './component/app.component';
import { LoginComponent } from './component/login.component';
import { UserComponent } from './component/user/user.component';
import { UserEditComponent } from './component/user/user.edit.component';
import { UserChangePasswordComponent } from './component/user/user.change.password.component';
import { ClientComponent } from './component/client/client.component';
import { ClientEditComponent } from './component/client/client.edit.component';

import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { ClientService } from './service/client.service';

import { AuthenticationUtil } from './util/authentication.util';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'useredit', component: UserEditComponent },
    { path: 'userpassword', component: UserChangePasswordComponent },
    { path: 'client', component: ClientComponent },
    { path: 'clientedit', component: ClientEditComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
    providers: [
        AuthenticationUtil,
        AuthenticationService,
        UserService,
        ClientService
    ],
    imports:      [
        BrowserModule,
        HttpModule,
        JsonpModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(
            appRoutes
        )
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        UserComponent,
        UserEditComponent,
        UserChangePasswordComponent,
        ClientComponent,
        ClientEditComponent
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
