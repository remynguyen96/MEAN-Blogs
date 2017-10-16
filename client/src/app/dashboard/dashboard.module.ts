import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/_modules';
import { DashboardRouting } from './dashboard.routing';
////////////////////////
import { DashboardComponent } from './dashboard.component';

import { StoriesModule } from './stories/stories.module';
import { LibrariesModule } from './libraries/libraries.module';
import { CategoriesModule } from './categories/categories.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRouting,
    StoriesModule,
    LibrariesModule,
    CategoriesModule,
    UserModule,
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
