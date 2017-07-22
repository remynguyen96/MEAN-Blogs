import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/_modules';
import { AuthRouting } from './auth.routing';
import { AuthService } from './shared/auth.service';
////////////////////////
import { AuthComponent } from './auth.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRouting,
  ],
  declarations: [
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    EditPasswordComponent
  ],
  providers:[AuthService]
})
export class AuthModule { }
