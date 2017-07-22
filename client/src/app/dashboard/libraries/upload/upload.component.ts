import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

  formData : FormGroup;
  imagePlaceholder : string = "http://www.leoncidesign.com/images/placeholder.png";
  listImages : String[] = [];
  fileUpload : File[] = [];
  allImages : any;
  @ViewChild('imagesUpload') images : ElementRef;


  constructor(private formBuilder : FormBuilder) {

  }

  ngOnInit() {
    this.formUpload();
  }

  formUpload() {
    this.formData = this.formBuilder.group({
      caption: this.formBuilder.control(null,[
        Validators.required,
        Validators.maxLength(120),
      ]),
      images: this.formBuilder.control(null,Validators.required)
      // images: this.formBuilder.array([
      //   this.formBuilder.control(null,Validators.required)
      // ])
    });
    // this.allImages = this.formData.get('images') as FormArray ;
  }

  uploadInput() {
    this.images.nativeElement.click();
  }

  onFiles(e) {
      let target: HTMLInputElement = <HTMLInputElement>e.target;
      let fileList : FileList = target.files;
      if(fileList.length > 0) {
        let reader : any = new FileReader();
        reader.onload = () => {
          this.listImages.push(reader.result);
        }
        reader.readAsDataURL(fileList[0]);
        this.fileUpload.push(fileList[0]);
        target.value = null
      }
  }

  uploadFile() {
    this.formData.value.images = this.fileUpload;
    console.log(this.formData.value);
  }

}
