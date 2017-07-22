import { Component, OnInit, HostBinding, EventEmitter } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { CategoryService } from '../shared/category.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fadeInUpAnimation } from '../../../shared/_animation';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  animations: [fadeInUpAnimation]
})

export class CreateCategoryComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.display') display = 'block';

  formCategory : FormGroup;

  constructor(
    private categoryService : CategoryService,
    private snackBar : MdSnackBar,
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit() {
    this.formData();
  }

  formData() {
    this.formCategory = this.formBuilder.group({
      name: this.formBuilder.control(null, Validators.required),
      description: this.formBuilder.control(null),
    });
  }

  createNew() {
    this.categoryService.createData(this.formCategory.value)
      .subscribe(
        result => {
          this.categoryService.createMission(this.formCategory.value);
          this.formCategory.reset();
          this.snackBar.open('Add new category successful !','', {
            duration: 2000,
          });
        },
        err => console.error('error : '+err)
      )
  }



}
