import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { authAnimation } from '../shared/_animation';
import { ValidateService } from '../shared/_validation';
import { AuthService } from '../shared/auth.service';
import { MdSnackBar } from '@angular/material';
import 'rxjs/operator/debounceTime';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../shared/_style.scss'],
  animations: [authAnimation],
})
export class SignInComponent implements OnInit {
  @HostBinding('@authRouting') authRouting = true;
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.display') dislay = 'block';


  formSignIn : FormGroup;

  constructor(
    private authService : AuthService,
    private router : Router,
    private formBuilder : FormBuilder,
    private snackBar : MdSnackBar,
  ) { }

  ngOnInit() {
    let token = localStorage.getItem('tokenBlogs');
    if(token !== null){
      this.router.navigate(['/dashboard']);
    }
    this.formData();
  }

  private formData() {
    this.formSignIn = this.formBuilder.group({
      email: this.formBuilder.control(null,[
        Validators.required,
        ValidateService.validateEmail,
      ]),
      password: this.formBuilder.control(null,Validators.required),
    });
  }

  signIn() {
    this.authService.loadingProgress.next(true);
    this.formSignIn.value.password = this.authService.encryptCode(this.formSignIn.get('password').value);
    setTimeout(() => {
      this.authService.authUser(this.formSignIn.value,'sign-in')
        .subscribe(
            result => {
              this.authService.loadingProgress.next(false);
              this.snackBar.open('Login successful !','', {
                duration: 2000,
              });
              this.router.navigate(['/dashboard']);
            },
            err => {
              this.authService.loadingProgress.next(false);
              console.log('error: '+ err);
            },
         );
    },1600)

  }
}
