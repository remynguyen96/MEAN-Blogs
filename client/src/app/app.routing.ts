import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AuthGuard } from './auth/shared/auth.guard';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes : Routes = [
  {
    path: '',
    // component: AppComponent,
    loadChildren: 'app/blogs/blogs.module#BlogsModule',
    data: { title: 'Những Câu Chuyện Cuộc Sống - Lá Xanh' }
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
    data: { title: 'Authentication' }
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    data: { title: 'Dashboard Admin' },
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { title: 'Not Found Page' }
  },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy : PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRouting {}
