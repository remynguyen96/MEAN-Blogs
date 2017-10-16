import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { MdSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fadeInUpAnimation } from '../../../shared/_animation';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ENVConfig } from '../../../../environments/environment.env';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  animations: [fadeInUpAnimation],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.display') display = 'block';

  subscription : Subscription;
  formUser : FormGroup;
  userDetail : User;
  idUser : string;
  urlService : string = `${ENVConfig.URL}/images/avatars/`;
  loading : boolean = true;
  imagePlaceholder : string = "http://www.leoncidesign.com/images/placeholder.png";

  constructor(
    private userService : UserService,
    private formBuilder : FormBuilder,
    private snackBar : MdSnackBar,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ) {

  }

  ngOnInit() {
    this.idUser = this.activatedRoute.snapshot.params['id'];
    this.subscription = this.userService.missionEdit$.subscribe(
      result => {
        this.userDetail = result;
      },
      error => console.error('error: '+error)
    )
    this.formData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  formData() {
    this.formUser = this.formBuilder.group({
      name: this.formBuilder.control(null,Validators.required),
      avatar: this.formBuilder.control(null,Validators.required)
    });
  }

  onFiles(e){
    let files = e.target.files;
    let name = files[0].name;
    let reader : any = new FileReader();
    let self = this;
    reader.onload = (e) => {
        self.imagePlaceholder = e.target.result
    }
    reader.readAsDataURL(files[0]);
    this.loading = false;
  }

  updateUser() {
    const file = this.formUser.value.avatar[0];
    const formData:FormData = new FormData();
    formData.append('file', file, file.name);
    this.userService.uploadImage(formData)
      .subscribe(
        data => {
          if(data.success === false){
            this.snackBar.open('Error upload images !',data, {
              duration: 2000,
            });
          }else {
            this.formUser.value.avatar = data.message;
            this.userService.updateData(this.idUser,this.formUser.value)
              .subscribe(
                result => {
                  this.userService.updateUserEdit(this.formUser.value);
                  this.snackBar.open('Edit user successful !','', {
                    duration: 2000,
                  });
                  this.formUser.reset();
                  this.router.navigate(['/dashboard/users']);
                },
                err => console.error('error : '+err)
              )
          }
        },
        err => console.error('error : '+err)
      )
  }

}
