import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryResolve } from './shared/story.resolve';

import { StoriesComponent } from './stories.component';
import { EditStoryComponent } from './edit-story/edit-story.component';
import { AddStoryComponent } from './add-story/add-story.component'
const routes : Routes = [
  {
    path: '',
    component: StoriesComponent,
    children: [
      {
        path: '',
        redirectTo: 'add',
        pathMatch: 'full'
      },
      {
        path: 'add',
        component: AddStoryComponent,
        data: { title: 'Dashboard Category - Lá Xanh' },
      },
      {
        path: 'edit/:slug',
        component: EditStoryComponent,
        data: { title: 'Dashboard Edit Story - Lá Xanh' },
        resolve : {
          detailCategory : StoryResolve
        },
      },
    ]
  },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoriesRouting {}
