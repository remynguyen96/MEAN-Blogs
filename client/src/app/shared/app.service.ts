import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class AppService {


  private appRootSource = new Subject<string>();
  private blogsSource = new Subject<string>();
  constructor() {
  }

  appRoot$ = this.appRootSource.asObservable();
  blogs$ = this.blogsSource.asObservable();

  activeHome(active : string) {
    this.appRootSource.next(active);
  }
  annouceBlogs(active : string) {
    this.blogsSource.next(active);
  }

}
