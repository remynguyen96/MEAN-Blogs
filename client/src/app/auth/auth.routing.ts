import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
const routes : Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        component: SignInComponent,
        data: { title: 'Sign In Blogs' }
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: { title: 'Sign Up Blogs' }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: 'Forgot Password' }
      },
      {
        path: 'update-password',
        component: EditPasswordComponent,
        data: { title: 'Update Password' }
      },
    ]
  },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRouting {}
