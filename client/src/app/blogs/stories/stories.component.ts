import { Component, OnInit, HostBinding } from '@angular/core';
import { DatePipe } from '@angular/common';
import { fadeInUpAnimation } from '../../shared/_animation';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { StoryService } from '../../dashboard/stories/shared/story.service';
import { ENVConfig } from '../../../environments/environment.env';
@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  animations: [fadeInUpAnimation],
  providers:[StoryService]
})
export class StoriesComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.display') display = 'block';

  subscription: Subscription;
  listStories : any = [];
  urlService : string = `${ENVConfig.URL}/images/`;

  constructor(
    private storyService: StoryService,
    private router: Router,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    // NOTE: List Stories
    this.storyService.getList().subscribe(
      result => {
        this.listStories = result
        console.log(result);
      },
      err => console.error('error : '+ err)
    )
  }

  transformDate (date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  viewStream() {

  }

  viewModule() {

  }


}
