import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/_modules';
import { BlogsRouting } from './blogs.routing';
////////////////////////
import { BlogsComponent } from './blogs.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { StoriesComponent } from './stories/stories.component';
import { DetailComponent } from './stories/detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    BlogsRouting,
    SharedModule,
  ],
  declarations: [
    BlogsComponent,
    ContactMeComponent,
    LibrariesComponent,
    StoriesComponent,
    DetailComponent,
  ],
  providers:[]
})
export class BlogsModule { }
