import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UpdateComponent } from './update/update.component'
const routes : Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: ':id',
        component: UpdateComponent,
        data: { title: 'User Blogs- Lá Xanh' },
      },
    ]
  },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRouting {}
