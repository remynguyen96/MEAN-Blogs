import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { StoriesComponent } from './stories/stories.component';
import { DetailComponent } from './stories/detail/detail.component';
const routes : Routes = [
  {
    path: '',
    component: BlogsComponent,
    children:[
      {
        path: 'lien-he',
        component: ContactMeComponent,
        data: { title: 'Liên Hệ' },
      },
      {
        path: 'thu-vien-hinh-anh',
        component: LibrariesComponent,
        // loadChildren: 'app/blogs/libraries/libraries.module#LibrariesModule',
        data: { title: 'Thư Viện Hình Ảnh' },
      },
      {
        path: 'cau-chuyen-cuoc-song',
        component: StoriesComponent,
        // loadChildren: 'app/blogs/stories/stories.module#StoriesModule',
        data: { title: 'Câu Chuyện Cuộc Sống' },
      },
      {
        path: 'cau-chuyen-cuoc-song/:slug',
        component: DetailComponent,
        data: { title: 'Câu Chuyện Cuộc Sống 2' },
      },
    ]
  },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogsRouting {}
