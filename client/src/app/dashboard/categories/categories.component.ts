import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from './shared/category.service';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  listCategories : any = [];
  subscription : Subscription;

  constructor(
    private categoryService : CategoryService,
    private snackBar : MdSnackBar,
  ) { }

  ngOnInit() {
    this.subscription = this.categoryService.missionHome$.subscribe(
      mission => {
        console.log(mission);
        this.listCategories.unshift(mission);
      }
    )
    this.categoryService.getList().subscribe(
      result => {
        this.listCategories = result
      },
      err => console.error('error : '+ err)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(key, id) {
    this.categoryService.deleteData(id).subscribe(
      result => {
        this.snackBar.open('Delete category successful !','', {
          duration: 2000,
        });
        this.listCategories.splice(key, 1);
      },
      err => console.error('error : '+ err)
    )
  }

}
