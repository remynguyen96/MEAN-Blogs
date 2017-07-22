import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../../../shared/global.service';
import { User } from './user';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class UserService extends GlobalService {
  protected database : string = 'users';

  private missionUser = new Subject<User>();
  private missionEdit = new Subject<User>();

  missionUser$ = this.missionUser.asObservable();
  missionEdit$ = this.missionEdit.asObservable();

  constructor(
    private http : Http,
  ) {
    super(http);
  }

  getUserToEdit(user : User) {
    this.missionEdit.next(user);
  }

  updateUserEdit(user : User) {
    this.missionUser.next(user);
  }



}
