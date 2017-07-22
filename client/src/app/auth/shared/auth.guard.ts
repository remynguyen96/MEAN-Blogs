import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  private isLoggedIn : Observable<boolean> ;

  constructor(
    private router : Router,
    private authService : AuthService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.verifiedAuth();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
      return this.canActivate(route,state);
  }

  verifiedAuth(){
    let token = localStorage.getItem('tokenBlogs');
    if(token !== null){
      return true;
    }
    this.router.navigate(['/auth/sign-in']);
    return false;
  }

  // canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
  //     // console.log('canLoad verified address please login !');
  //     // console.log(route);
  //     return this.verifiedAuth();
  // }



}
