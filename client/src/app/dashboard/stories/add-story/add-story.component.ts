import { Component, OnInit, HostBinding } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { StoryService } from '../shared/story.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Category } from '../../categories/shared/category';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fadeInUpAnimation } from '../../../shared/_animation';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss'],
  animations: [fadeInUpAnimation],
  providers: [CategoryService]
})

export class AddStoryComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.display') display = 'block';

  formStory : FormGroup;
  listCategory : Category;
  alias : string = '';
  imagePlaceholder : string = "http://www.leoncidesign.com/images/placeholder.png";

  constructor(
    private storyService : StoryService,
    private categoryService : CategoryService,
    private snackBar : MdSnackBar,
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit() {
    this.formData();
    this.categoryService.getList().subscribe(
      result => {
        this.listCategory = result
      },
      err => console.error('error : '+ err)
    )
  }

  formData() {
    this.formStory = this.formBuilder.group({
      title: this.formBuilder.control(null, Validators.required),
      slug: this.formBuilder.control(null),
      images: this.formBuilder.control(null, Validators.required),
      categories: this.formBuilder.control(null, Validators.required),
      description: this.formBuilder.control(null),
    });
  }

  convertAlias(e) {
    this.alias = this.storyService.convertSlug(e.target.value);
  }

  onFiles(e){
    let files = e.target.files;
    let name = files[0].name;
    let reader : any = new FileReader();
    let self = this;
    reader.onload = (e) => {
        self.imagePlaceholder = e.target.result
    }
    reader.readAsDataURL(files[0])
  }

  createNew() {
    this.formStory.value.slug = this.alias;
    const file = this.formStory.value.images[0];
    const formData:FormData = new FormData();
    formData.append('file', file, file.name);
    this.storyService.uploadImage(formData)
      .subscribe(
        data => {
          if(data.success === false){
            this.snackBar.open('Error upload images !',data, {
              duration: 2000,
            });
          }else {
            this.formStory.value.images = data.message;
            this.storyService.createData(this.formStory.value)
              .subscribe(
                result => {
                  this.storyService.createMission(this.formStory.value);
                  this.snackBar.open('Add new story successful !','', {
                    duration: 2000,
                  });
                  this.formStory.reset();
                },
                err => console.error('error : '+err)
              )
          }
        },
        err => console.error('error : '+err)
      )
  }





}
