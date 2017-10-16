import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
const Routes : Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Dashboard Admin' },
    children: [
      {
        path: 'categories',
        loadChildren: 'app/dashboard/categories/categories.module#CategoriesModule',
        data: { title: 'Dashboard Category' }
      },
      {
        path: 'stories',
        loadChildren: 'app/dashboard/stories/stories.module#StoriesModule',
        data: { title: 'Dashboard Story' }
      },
      {
        path: 'libraries',
        loadChildren: 'app/dashboard/libraries/libraries.module#LibrariesModule',
        data: { title: 'Dashboard Story' }
      },
      {
        path: 'users',
        loadChildren: 'app/dashboard/user/user.module#UserModule',
        data: { title: 'Dashboard User' }
      },
    ]
  },

];
@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
})
export class DashboardRouting {}
