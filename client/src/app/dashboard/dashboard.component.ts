import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInUpAnimation } from '../shared/_animation';
import { Router } from '@angular/router';
import { ENVConfig } from '../../environments/environment.env';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeInUpAnimation],
})
export class DashboardComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position')  position = 'relative';
  @HostBinding('style.display')   display = 'block';

  routes = [
    { label: 'Categories', link: 'categories' },
    { label: 'Stories', link: 'stories' },
    { label: 'Libraries', link: 'libraries' },
    { label: 'Users', link: 'users' },
  ];

  infoUser : any;
  urlService : string = `${ENVConfig.URL}/images/avatars`;


  constructor(private router : Router) {

  }

  ngOnInit() {
    this.infoUser = JSON.parse(localStorage.getItem('infomationUser'));
  }

  btnLogout() {
    localStorage.removeItem('infomationUser');
    localStorage.removeItem('tokenBlogs');
    this.router.navigate(['/auth/sign-in']);
  }

}
