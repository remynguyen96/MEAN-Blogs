import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/_modules';
import { LibrarysRouting } from './libraries.routing'
import { LibraryService } from './shared/library.service';

import { LibrariesComponent } from './libraries.component';
import { UploadComponent } from './upload/upload.component'
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LibrarysRouting,
  ],
  declarations: [
    LibrariesComponent,
    UploadComponent
  ],
  providers: [LibraryService]
})
export class LibrariesModule { }
