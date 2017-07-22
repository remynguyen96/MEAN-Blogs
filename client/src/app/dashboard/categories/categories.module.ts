import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/_modules';
import { CategoriesRouting } from './categories.routing';
import { CategoryService } from './shared/category.service';
import { CategoryResolve } from './shared/category.resolve';

import { CategoriesComponent } from './categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRouting,
  ],
  declarations: [
    CategoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
  ],
  providers: [CategoryService, CategoryResolve]
})
export class CategoriesModule {
}
