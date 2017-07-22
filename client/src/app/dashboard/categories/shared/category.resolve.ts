import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Category } from './category';
import { CategoryService } from './category.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CategoryResolve implements Resolve<Category> {

  constructor(private categoryService: CategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any  {
     let idCategory = route.params['id'];
     return this.categoryService.getDetail(idCategory);
   }

}
