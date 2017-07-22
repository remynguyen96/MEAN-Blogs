import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ENVConfig } from '../../environments/environment.env';
import 'rxjs/add/operator/catch';
@Injectable()
export class GlobalService {

  URLservice : string = ENVConfig.URL;
  protected database : string;

  constructor(
    private _http : Http,
  ) { }

  protected getURL() : string{
    return `${this.URLservice}/api/${this.database}`;
  }

  getList(): Observable<any> {
    return this._http.get(`${this.getURL()}/`,this.options())
            .map((response : Response) => response.json())
            .catch(this.handleError);
  }

  getDetail (alias : string | number): Observable<any> {
    return this._http.get(`${this.getURL()}/${alias}`,this.options())
            .map((response : Response) => response.json())
            .catch(this.handleError);
  }

  createData(data : any): Observable<any> {
    return this._http.post(`${this.getURL()}/create`,data,this.options())
            .map((response : Response) => response.json())
            .catch(this.handleError);
  }

  updateData(alias : string | number,data : any) : Observable<any>{
    return this._http.patch(`${this.getURL()}/update/${alias}`,data,this.options())
            .map((response : Response) => response.json())
            .catch(this.handleError);
  }

  deleteData(alias : string | number) : Observable<Response> {
    return this._http.delete(`${this.getURL()}/delete/${alias}`,this.options())
            .map((response : Response) => response.json())
            .catch(this.handleError);
  }

  uploadImage(file : any): Observable<any> {
    return this._http.post(`${this.getURL()}/upload-image`,file,this.options())
            .map((response : Response) => response.json())
            .catch(this.handleError);
  }

  options() {
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
    headers.append('Authorization', `${localStorage.getItem('tokenBlogs')}`);
    return new RequestOptions({ headers : headers });
  }

  protected handleError(err) {
    let errMessage: string;
    if (err instanceof Response) {
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMessage);
  }

  convertSlug(str : string) :string{
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
      str = str.replace(/-+-/g, "-");
      str = str.replace(/^\-+|\-+$/g, "");
      return str;
  }









}
