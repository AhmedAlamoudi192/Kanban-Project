import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SharedModule } from '../shared/shared.module';
import { GoogleSigninDirective } from './google-signin.directive';
import { EmailLoginpageComponent } from './email-loginpage/email-loginpage.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginpageComponent,
    GoogleSigninDirective,
    EmailLoginpageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
