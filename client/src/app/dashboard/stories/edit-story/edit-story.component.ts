import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { StoryService } from '../shared/story.service';
import { Story } from '../shared/story';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../categories/shared/category.service';
import { Category } from '../../categories/shared/category';
import { fadeInUpAnimation } from '../../../shared/_animation';
@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss'],
  animations: [fadeInUpAnimation],
  providers: [CategoryService],
})
export class EditStoryComponent implements OnInit, OnDestroy {

  private story : Story;
  private subscription : Subscription
  formCategory : FormGroup;
  listCategory : Category;
  alias : string = '';
  imagePlaceholder : string = "http://www.leoncidesign.com/images/placeholder.png";

  constructor(
    private storyService : StoryService,
    private categoryService : CategoryService,
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private router : Router,
    private snackBar : MdSnackBar,
    private sanitizer : DomSanitizer,
  ) { }

  ngOnInit() {
    // console.log(this.activatedRoute.snapshot.params['id']);
    this.subscription = this.activatedRoute.data.subscribe(
      result => {
        this.story = result.detailCategory;
      },
      err => console.error('error: '+err)
    )
    this.formData();
    this.categoryService.getList().subscribe(
      result => {
        this.listCategory = result
      },
      err => console.error('error : '+ err)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public get descriptionHTML (): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.story.description);
  }

  formData() {
    this.formCategory = this.formBuilder.group({
      name: this.formBuilder.control(this.story.title,Validators.required),
      slug: this.formBuilder.control(this.story.slug),
      categories: this.formBuilder.control(this.story.categories),
      description: this.formBuilder.control(this.story.description),
    });
  }

  editCategory() {
  this.storyService.updateData(this.story.slug,this.formCategory.value)
    .subscribe(
      result => {
        console.log(result);
        this.storyService.editMission(this.formCategory.value);
        this.snackBar.open('Edit story successful !','', {
          duration: 2000,
        });
        this.router.navigate(['/dashboard/stories']);
      },
      err => console.error('error : '+err)
    )
  }

}
