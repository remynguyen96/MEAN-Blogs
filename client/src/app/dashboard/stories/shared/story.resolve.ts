import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Story } from './story';
import { StoryService } from './story.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class StoryResolve implements Resolve<Story> {

  constructor(private storyService: StoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any  {
     let slugStory = route.params['slug'];
     return this.storyService.getDetail(slugStory);
   }

}
