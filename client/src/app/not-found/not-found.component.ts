import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInUpAnimation } from '../shared/_animation';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [fadeInUpAnimation],
})
export class NotFoundComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position')  position = 'relative';
  @HostBinding('style.display')   display = 'block';
  
  constructor() { }

  ngOnInit() {
  }

}
