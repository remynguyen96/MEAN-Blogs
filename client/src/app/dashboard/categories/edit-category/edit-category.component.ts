import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  private category : Category;
  private subscription : Subscription
  formCategory : FormGroup;
  constructor(
    private categoryService : CategoryService,
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private Router : Router,
    private snackBar : MdSnackBar,
    private sanitizer : DomSanitizer,
  ) { }

  ngOnInit() {
    // console.log(this.activatedRoute.snapshot.params['id']);
    this.subscription = this.activatedRoute.data.subscribe(
      result => {
        this.category = result.detailCategory;
      },
      err => console.error('error: '+err)
    )
    this.formData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public get descriptionHTML(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.category.description);
  }

  formData() {
    this.formCategory = this.formBuilder.group({
      name: this.formBuilder.control(this.category.name),
      description: this.formBuilder.control(this.category.description),
    });
  }

  editCategory() {
    console.log(this.formCategory.value);
  // this.categoryService.createData(this.formCategory.value)
  //   .subscribe(
  //     result => {
  //       this.categoryService.createMission(this.formCategory.value);
  //       this.formCategory.value.name = '';
  //       this.formCategory.value.description = '';
  //       this.snackBar.open('Add new category successful !','', {
  //         duration: 2000,
  //       });
  //     },
  //     err => console.error('error : '+err)
  //   )
  }

}
