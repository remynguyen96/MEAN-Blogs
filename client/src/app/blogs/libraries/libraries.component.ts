import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInUpAnimation } from '../../shared/_animation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss'],
  animations:[fadeInUpAnimation],
})
export class LibrariesComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position')  position = 'relative';
  @HostBinding('style.display')   display = 'block';
  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.router.events.forEach((event : NavigationEvent) => {
    //   if(event instanceof NavigationEnd) {
    //     if(event.urlAfterRedirects === '/auth' || event.urlAfterRedirects === '/dashboard'){
    //       console.log('good job');
    //     }
    //   }
    // })

    // this.route.params.map((params) => {
      // console.log(params);
    // }).subscribe();
  }

}
