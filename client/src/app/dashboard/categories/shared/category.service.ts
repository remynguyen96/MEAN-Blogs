import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../../../shared/global.service';
import { Subject }    from 'rxjs/Subject';
import { Category } from './category'
@Injectable()
export class CategoryService extends GlobalService {
  protected database : string = 'categories';

  private missionHome = new Subject<Category>();
  private missionDelete = new Subject<Category>();
  private missionCreate = new Subject<Category>();
  private missionEdit = new Subject<Category>();

  missionHome$ = this.missionHome.asObservable();
  missionCreate$ = this.missionCreate.asObservable();
  missionEdit$ = this.missionEdit.asObservable();
  missionDelete$ = this.missionDelete.asObservable();

  constructor(
    private http : Http,
  ) {
    super(http);
  }

  createMission(data : Category) {
    this.missionHome.next(data);
  }

  editMission(data : Category) {
    this.missionHome.next(data);
  }

  deleteMission(data : Category) {
    this.missionEdit.next(data);
  }



}
