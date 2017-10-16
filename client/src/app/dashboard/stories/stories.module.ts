import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/_modules';
import { StoriesRouting } from './stories.routing';
import { StoryService } from './shared/story.service';
import { StoryResolve } from './shared/story.resolve';

import { StoriesComponent } from './stories.component';
import { EditStoryComponent } from './edit-story/edit-story.component';
import { AddStoryComponent } from './add-story/add-story.component'
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoriesRouting,
  ],
  declarations: [
    StoriesComponent,
    EditStoryComponent,
    AddStoryComponent,
  ],
  providers: [StoryService, StoryResolve],
})
export class StoriesModule { }
