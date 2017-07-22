import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { authAnimation } from '../shared/_animation';
import { ValidateService } from '../shared/_validation';
import { AuthService } from '../shared/auth.service';
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../shared/_style.scss'],
  animations: [authAnimation]
})
export class SignUpComponent implements OnInit {
  @HostBinding('@authRouting') authRouting = true;
  @HostBinding('style.position')  position = 'relative';
  @HostBinding('style.display')   display = 'block';

  formSignUp : FormGroup;
  private ipAddress : string;
  // private _token : string;

  constructor(
    private authService : AuthService,
    private router : Router,
    private formBuilder : FormBuilder,
    private snackBar : MdSnackBar
  ) { }

  ngOnInit() {
    let token = localStorage.getItem('tokenBlogs');
    if(token !== null){
      this.router.navigate(['/dashboard']);
    }
    this.authService.GetIPaddress().subscribe(
      IPaddress => this.ipAddress = IPaddress.ip,
      errorIP => {
        console.log(`error : ${errorIP}`);
      }
    );
    this.formData();
  }

  private formData() {
    this.formSignUp = this.formBuilder.group({
      name : this.formBuilder.control(null,Validators.required),
      // name : this.formBuilder.control(null,[
      //     Validators.required,
      //     Validators.pattern('[\\w\\-\\s\\/]+')
      // ]),
      // username: this.formBuilder.control(null,Validators.compose([
      //   Validators.required, // Field is required
      //   Validators.minLength(3),
      //   Validators.maxLength(15),
      //   this.validateUsername
      // ])),
      email: this.formBuilder.control(null,[
        Validators.minLength(5),
        Validators.maxLength(30),
        ValidateService.validateEmail,
      ]),
      password: this.formBuilder.control(null,[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(35),
        ValidateService.validatePassword
      ]),
      passwordConfirm: this.formBuilder.control(null,Validators.required),
      ipAddress : this.formBuilder.control(null),
    },{
      validator: ValidateService.confirmPassword('password','passwordConfirm')
    });
  }

  validateUsername(controls) {
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      if (regExp.test(controls.value)) {
        return null; // Return as valid username
      } else {
        return { 'validateUsername': true }
      }
   }

  signUp() {
    this.authService.loadingProgress.next(true);
    this.formSignUp.value.ipAddress = this.authService.encryptCode(this.ipAddress);
    this.formSignUp.value.password = this.authService.encryptCode(this.formSignUp.get('password').value);
    this.formSignUp.value.passwordConfirm = this.authService.encryptCode(this.formSignUp.get('passwordConfirm').value);
    setTimeout(() => {
      this.authService.authUser(this.formSignUp.value,'sign-up').subscribe(
        result => {
          this.authService.loadingProgress.next(false);
          if(result.errors){
            if(result.errors instanceof Array) {
              result.errors.forEach((err) => {
                this.snackBar.open(err, 'Error', {
                  duration: 2400,
                });
              });
            }else{
              this.snackBar.open(result.errors, 'Error', {
                duration: 2400,
              });
            }
          }else{
            this.authService.loadingProgress.next(false);
            this.snackBar.open('Congratulation register member successful !','', {
              duration: 2000,
            });
            this.router.navigate(['/dashboard']);
          }
        },
        err => console.error(err),
      );
    },1600)
  }

  // checkUsername() {
    // let username = this.formSignUp.get('username').value;
    // console.log(username);
  // }

}
