import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/_modules';
import { AppRouting } from './app.routing';
import { AuthGuard } from './auth/shared/auth.guard';
////////////////////////
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
////////////////////////
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BlogsModule } from './blogs/blogs.module';
import { NavbarComponent } from './navbar/navbar.component';
setTimeout(()=> {
  document.getElementsByTagName('body')[0].classList.add('loaded');
},1200);
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRouting,
    SharedModule,
    AuthModule,
    DashboardModule,
    BlogsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
