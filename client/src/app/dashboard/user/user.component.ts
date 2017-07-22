import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './shared/user.service'
import { User } from './shared/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ENVConfig } from '../../../environments/environment.env';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  listUsers : User[] = [];
  urlService : string = `${ENVConfig.URL}/images/avatars/`;
  constructor(
    private userService : UserService,
    private snackBar : MdSnackBar,
    private router : Router,
  ) { }

  ngOnInit() {
    this.userService.getList().subscribe(
      result => {
        this.listUsers = result;
      },
      error => console.error('error: '+error)
    )
    this.subscription = this.userService.missionUser$.subscribe(
      result => {
        console.log(result);
      },
      error => console.error('error: '+error)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteUser(key, id) {
    this.userService.deleteData(id).subscribe(
      result => {
        this.snackBar.open('Delete member successful !','', {
          duration: 2000,
        });
        this.listUsers.splice(key, 1);
      },
      err => console.error('error : '+ err)
    )
  }

  detailUser(user) {
    let infomation : any = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
    };
    this.userService.getUserToEdit(infomation);
    this.router.navigate(['/dashboard/users',infomation._id]);
  }

}
