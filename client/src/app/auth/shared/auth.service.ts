import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, ResponseOptions, Headers } from '@angular/http';
import { ENVConfig } from '../../../environments/environment.env';
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";
import { GlobalService } from '../../shared/global.service';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class AuthService extends GlobalService {

  protected database : string = 'users';
  // private key : any  = CryptoJS.enc.Base64.parse(ENVConfig.key);
  private iv  : any  = CryptoJS.enc.Base64.parse(ENVConfig.iv);
  private passportCode  : string  = ENVConfig.passportCode;
  loadingProgress = new Subject<boolean>();

  constructor(
    private http : Http,
    private router : Router,
  ) {
    super(http);
  }

  loading$ = this.loadingProgress.asObservable();

  encryptCode(str) : Observable<string>{
    let encrypt = CryptoJS.AES.encrypt(str, this.passportCode, {iv: this.iv});
    let encrypted = encrypt.toString();
    // let encrypted = encrypt.ciphertext.toString(CryptoJS.enc.Base64)  //not decrypted;
    return encrypted;
  }

  decryptCode(code) : Observable<string>{
    let decrypted = CryptoJS.AES.decrypt(code, this.passportCode, {iv: this.iv});
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  GetIPaddress() : Observable<any>{
    return this.http.get('http://ipinfo.io')
             .map((response : Response) => response.json())
             .catch(this.handleError);
  }



  // strRandom(number: number): string {
  //   let token = '';
  //   let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   for (let i = 0; i < number; i++) {
  //       token += possible.charAt(Math.floor(Math.random() * possible.length))
  //   }
  //   return token;
  // }

  authUser(infomation, urlAuth) :Observable<any> {
    return this.http.post(`${this.getURL()}/${urlAuth}`,infomation,this.options())
            .map((response : Response) => response.json())
            .do(
              tokenData => {
                  let user : any = {
                    name: tokenData.name,
                    email: tokenData.email,
                    id: tokenData._id,
                    avatar: tokenData.avatar,
                  };
                  localStorage.setItem('tokenBlogs',tokenData.token);
                  localStorage.setItem('infomationUser',JSON.stringify(user));
              }
            )
            .catch(this.handleError);
  }

  logOut() {
      localStorage.removeItem('tokenBlogs');
  }

  // verifiedEmail(infomation : any) : Observable<any>{
  //   return this.http.post(`${this.URLservice}/api/verified-users`,infomation,this.options())
  //                   .map((response : Response) => response.json() )
  //                   .catch(this.handleError);
  // }
  //
  // resetPassword(infomation : any) : Observable<any>{
  //   return this.http.post(`${this.URLservice}/api/auth/forgot-password`,infomation,this.options())
  //                   .map((response : Response) => response.json() )
  //                   .catch(this.handleError);
  // }
  //
  // updatePassword(infomation : any) : Observable<any>{
  //   return this.http.post(`${this.URLservice}/api/auth/update-password`,infomation,this.options())
  //                   .map((response : Response) => response.json() )
  //                   .catch(this.handleError);
  // }




}
