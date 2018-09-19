import { NgModule } from '@angular/core';
import { PhotosComponent } from './photos.component';
import { LayoutModule } from '../share/modules/layout.module';
import { RouterModule } from '@angular/router';
import { PHOTOS_ROUTES } from './photos.routes';
import { PhotosService } from './shared/services/photos.service';
import { StoreModule } from '@ngrx/store';
import { photosReducer } from './shared/store/photos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PhotosEffect } from './shared/store/photos.effects';

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forChild(PHOTOS_ROUTES),
    StoreModule.forFeature('photos', photosReducer),
    EffectsModule.forFeature([PhotosEffect])
  ],
  providers: [
    PhotosService
  ],
  declarations: [PhotosComponent]
})
export class PhotosModule { }
