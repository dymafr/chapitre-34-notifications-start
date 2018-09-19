import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../share/modules/layout.module';

import { PROFILE_ROUTES } from './profile.routes';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    RouterModule.forChild(PROFILE_ROUTES),
    LayoutModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
