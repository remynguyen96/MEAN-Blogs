import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { authAnimation } from '../shared/_animation';
import { ValidateService } from '../shared/_validation';
import { AuthService } from '../shared/auth.service';
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['../shared/_style.scss'],
  animations:[authAnimation]
})
export class EditPasswordComponent implements OnInit {
  @HostBinding('@authRouting') authRouting = true;
  @HostBinding('style.position')  position = 'relative';
  @HostBinding('style.display')   display = 'block';
  formData : FormGroup;

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
    this.formForgot();
  }

  formForgot(){
    this.formData = this.formBuilder.group({
      password: this.formBuilder.control(null,[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(35),
        ValidateService.validatePassword
      ]),
      passwordConfirm: this.formBuilder.control(null,Validators.required),
    },{
      validator: ValidateService.confirmPassword('password','passwordConfirm')
    });
  }

  submitForm() {
    this.authService.loadingProgress.next(true);
    setTimeout(() => {
      this.authService.loadingProgress.next(false);
      this.formData.value.password = this.authService.encryptCode(this.formData.get('password').value);
      this.formData.value.passwordConfirm = this.authService.encryptCode(this.formData.get('passwordConfirm').value);
      console.log(this.formData.value);
    },1600)
  }

}
