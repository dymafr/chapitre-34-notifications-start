import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PhotosState } from "./photos.reducer";
import { PhotosAction } from "./photos.actions";

export const photosSelector = createFeatureSelector('photos');
export const filterSelector = createSelector(photosSelector, (photosState: PhotosState) => {
  if (photosState) {
    return photosState.filter;
  } else {
    return null;
  }
});

export const photosResultSelector = createSelector(photosSelector,
   (photosState: PhotosState) => {
     if (photosState) {
       return photosState.photos;
     } else {
       return null;
     }
   });
