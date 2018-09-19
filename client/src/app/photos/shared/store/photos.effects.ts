import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { FETCH_PHOTOS, FetchPhotosSuccess } from "./photos.actions";
import { State } from "../../../share/store";
import { Store, select } from "@ngrx/store";
import { switchMap, map, take, debounceTime } from "rxjs/operators";
import { filterSelector } from './photos.selectors';
import { PhotosService } from "../services/photos.service";
import { Photo } from "../models/photo.model";

@Injectable()
export class PhotosEffect {

  @Effect()
  FetchPhotos$ = this.actions$.pipe(
    ofType(FETCH_PHOTOS),
    debounceTime(1000),
    switchMap( () => {
      return this.store.pipe(select(filterSelector), take(1));
    }),
    switchMap( (filter: string) => {
      return this.photosService.getPicture(filter);
    }),
    map( (photos: Photo[]) => {
      return new FetchPhotosSuccess(photos);
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private photosService: PhotosService
  ) {}

}
