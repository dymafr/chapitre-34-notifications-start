import { Action } from "@ngrx/store";
import { Photo } from "../models/photo.model";

export const SET_FILTER = '[ photos ] set filter';
export const FETCH_PHOTOS = '[ photos ] fetch photos';
export const FETCH_PHOTOS_SUCCESS = '[ photos ] fetch photos success';

export class SetFilter implements Action {
  readonly type = SET_FILTER;
  constructor(public payload: string) { }
}

export class FetchPhotos implements Action {
  readonly type = FETCH_PHOTOS;
}

export class FetchPhotosSuccess implements Action {
  readonly type = FETCH_PHOTOS_SUCCESS;
  constructor(public payload: Photo[]) { }
}

export type PhotosAction = SetFilter | FetchPhotos | FetchPhotosSuccess;
