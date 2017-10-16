import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../../../shared/global.service';
import { Subject }    from 'rxjs/Subject';
import { Story } from './story'
@Injectable()
export class StoryService extends GlobalService {
  protected database : string = 'blogs';

  private missionHome = new Subject<Story>();
  private missionDelete = new Subject<Story>();
  private missionCreate = new Subject<Story>();
  private missionEdit = new Subject<Story>();

  missionHome$ = this.missionHome.asObservable();
  missionCreate$ = this.missionCreate.asObservable();
  missionEdit$ = this.missionEdit.asObservable();
  missionDelete$ = this.missionDelete.asObservable();

  constructor(
    private http : Http,
  ) {
    super(http);
  }

  createMission(data : Story) {
    this.missionHome.next(data);
  }

  editMission(data : Story) {
    this.missionHome.next(data);
  }

  deleteMission(data : Story) {
    this.missionEdit.next(data);
  }

}
