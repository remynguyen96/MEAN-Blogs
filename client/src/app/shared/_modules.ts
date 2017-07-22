import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TinymceComponent } from './tinymce/tinymce.component';
import { FileValueAccessor } from './file';
import 'hammerjs';
@NgModule({
  declarations: [
    TinymceComponent,
    FileValueAccessor,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TinymceComponent,
    FileValueAccessor,
  ],
})
export class SharedModule {
}
