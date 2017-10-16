import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GlobalService } from '../../../shared/global.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class LibraryService {

  constructor(
    private http : Http,
  ) {
  }
}
