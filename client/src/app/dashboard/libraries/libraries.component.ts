import { Component, OnInit, HostBinding } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { LibraryService } from './shared/library.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fadeInUpAnimation } from '../../shared/_animation';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss'],
  animations: [fadeInUpAnimation],
})
export class LibrariesComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.display') display = 'block';

  formUpload : FormGroup;
  imagePlaceholder : string = "http://www.leoncidesign.com/images/placeholder.png";

  constructor(
    private libraryService : LibraryService,
    private snackBar : MdSnackBar,
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit() {
    this.formData();
    // this.libraryService.getList().subscribe(
    //   result => {
    //     this.listCategory = result
    //   },
    //   err => console.error('error : '+ err)
    // )
  }

  formData() {
    this.formUpload = this.formBuilder.group({
      title: this.formBuilder.control(null, Validators.required),
      images: this.formBuilder.control(null, Validators.required),
    });
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
    const file = this.formUpload.value.images[0];
    const formData:FormData = new FormData();
    formData.append('file', file, file.name);
    // this.libraryService.uploadImage(formData)
    //   .subscribe(
    //     data => {
    //       if(data.success === false){
    //         this.snackBar.open('Error upload images !',data, {
    //           duration: 2000,
    //         });
    //       } else {
    //         this.snackBar.open('Upload Images Successful !','', {
    //           duration: 2000,
    //         });
    //       }
    //     },
    //     err => console.error('error : '+err)
    //   )

  }
}
