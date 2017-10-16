import { Component, OnInit,HostBinding } from '@angular/core';
import { fadeInUpAnimation } from '../shared/_animation';
import { AuthService } from './shared/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations:[fadeInUpAnimation]
})
export class AuthComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position')  position = 'relative';
  @HostBinding('style.display')   display = 'block';

  listRouter = [
    {name: 'Login', link: '/auth/sign-in'},
    {name: 'Create Account', link: '/auth/sign-up'},
    {name: 'Forgot Password', link: '/auth/forgot-password'},
    {name: 'Update Password', link: '/auth/update-password'},
  ];

  loading: boolean = false;
  titleAuth: string = 'Login';
  constructor(private authService : AuthService) {

  }

  ngOnInit() {
    this.authService.loading$.subscribe(
      result => this.loading = result
    )
  }

  linkAuth(infomation : any) {
    this.titleAuth = infomation.name;
  }

}
