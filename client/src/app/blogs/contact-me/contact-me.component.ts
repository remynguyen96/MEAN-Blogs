import { Component, OnInit,HostBinding } from '@angular/core';
import { fadeInUpAnimation } from '../../shared/_animation';
@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
  animations: [ fadeInUpAnimation ]
})
export class ContactMeComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position')  position = 'relative';
  @HostBinding('style.display')   display = 'block';
  constructor() { }

  ngOnInit() {
  }

}
