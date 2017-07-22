import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  Renderer2,
  ElementRef,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/media';
import 'tinymce/plugins/image';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
// import 'tinymce/plugins/filemanager';

declare var tinymce: any;

const contentAccessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TinymceComponent),
  multi: true
};

@Component({
  selector: 'tinymce',
  providers: [contentAccessor],
  template: `<textarea id="{{elementId}}">
    <ng-content></ng-content>
  </textarea>
<iframe id="form_target" name="form_target" style="display:none"></iframe>
   <input type="file" #images fxHide (change)='uploadFile($event)'>
  `,
})
export class TinymceComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {

  private onTouch: Function;
  private onModelChange: Function;
  @ViewChild('images') images : ElementRef;

   registerOnTouched(fn) {
     this.onTouch = fn;
   }
   registerOnChange(fn) {
     this.onModelChange = fn;
   }

   writeValue(value) {
     this.editorContent = value;
   }

   @Input() elementId: String;
   @Output() onEditorContentChange = new EventEmitter();

   constructor(
     private renderer : Renderer2
   ) { }

   editor;
   editorContent: string = null;

   ngAfterViewInit() {
     let self = this;
     tinymce.init({
       selector: `#${this.elementId}`,
       height: 250,
       paste_data_images: true,
       image_advtab: true,
       plugins: ['link', 'table', 'colorpicker', 'textcolor', 'print', 'preview', 'media', 'image', 'fullscreen'],
       toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image insertdatetime",
       toolbar2: "print preview media | forecolor backcolor",
       skin_url: '/assets/skins/lightgray',
       images_upload_handler: function (blobInfo, success, failure) {
         console.log(blobInfo);
            var xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'http://localhost:4000/api/blogs/upload-images');
            xhr.onload = function() {
              var json;
              if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
              }
              json = JSON.parse(xhr.responseText);

              if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
              }
              success(json.location);
            };
            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            xhr.send(formData);
       },
       file_picker_callback: function(callback, value, meta) {
         if (meta.filetype == 'image') {
           let image = self.images.nativeElement.click();
          //  console.log(meta);
          //  self.uploadFile(this.files[0])
          //  $('#upload').on('change', function() {
          //    var file = this.files[0];
          //    var reader = new FileReader();
          //    reader.onload = function(e) {
          //      callback(e.target.result, {
          //        alt: ''
          //      });
          //    };
          //    reader.readAsDataURL(file);
          //  });
         }
       },
       setup: editor => {
         this.editor = editor;
         editor.on('keyup change', () => {
           const tinyContent = editor.getContent();
           this.editorContent = tinyContent;
           this.onEditorContentChange.emit(tinyContent);
           this.onModelChange(tinyContent);
           this.onTouch();
          //  console.log(tinyContent);
         });
       }
     });
   }

   uploadFile(e) {
     let files = e.target.files;
     let name = files[0].name;
     let reader : any = new FileReader();
     reader.onload = (e) => {
        // callback(e.target.result, {
          // alt: ''
        // });
     }
     reader.readAsDataURL(files[0])
   }

   ngOnDestroy() {
     tinymce.remove(this.editor);
   }

}
// https://images.unsplash.com/photo-1481973964012-59a7f3225eb1?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=
