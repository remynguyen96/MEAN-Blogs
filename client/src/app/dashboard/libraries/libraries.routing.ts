import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrariesComponent } from './libraries.component';
import { UploadComponent } from './upload/upload.component'
const routes : Routes = [
  {
    path: '',
    component: LibrariesComponent,
  },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LibrarysRouting {}
