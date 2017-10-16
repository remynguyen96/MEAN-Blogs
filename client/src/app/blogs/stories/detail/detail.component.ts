import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInUpAnimation } from '../../../shared/_animation';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeInUpAnimation],
})
export class DetailComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.display') display = 'block';

  subscription : Subscription;

  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.subscription = this.activatedRoute.data.
  }


}
