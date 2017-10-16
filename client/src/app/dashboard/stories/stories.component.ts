import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoryService } from './shared/story.service';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Story } from './shared/story';
@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, OnDestroy {

  listStories : Story[] = [];
  subscription : Subscription;

  constructor(
    private storyService : StoryService,
    private snackBar : MdSnackBar,
  ) { }

  ngOnInit() {
    this.subscription = this.storyService.missionHome$.subscribe(
      mission => {
        console.log(mission);
        this.listStories.unshift(mission);
      }
    )
    this.storyService.getList().subscribe(
      result => {
        this.listStories = result
      },
      err => console.error('error : '+ err)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(key, slug) {
    this.storyService.deleteData(slug).subscribe(
      result => {
        this.snackBar.open('Delete story successful !','', {
          duration: 2000,
        });
        this.listStories.splice(key, 1);
      },
      err => console.error('error : '+ err)
    )
  }

}
