import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryResolve } from './shared/category.resolve';

import { CategoriesComponent } from './categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
const routes : Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateCategoryComponent,
        data: { title: 'Dashboard Category - Lá Xanh' },
      },
      {
        path: 'edit/:id',
        component: EditCategoryComponent,
        data: { title: 'Dashboard Edit Category - Lá Xanh' },
        resolve : {
          detailCategory : CategoryResolve
        },
      },
    ]
  },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRouting {}
