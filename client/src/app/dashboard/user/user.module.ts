import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/_modules';
import { UserRouting } from './user.routing'
import { UserService } from './shared/user.service';

import { UserComponent } from './user.component';
import { UpdateComponent } from './update/update.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRouting,
  ],
  declarations: [
    UserComponent,
    UpdateComponent,
  ],
  providers: [UserService]
})
export class UserModule { }
