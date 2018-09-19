import { Injectable } from '@angular/core';
import Unsplash from 'unsplash-js';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PhotosService {
  private unsplash = new Unsplash({
    applicationId: 'd735ade0117e703f4c8b2ef98cfd27879291d34c8de2d7dd261616f684df435c',
    secret: '3860e72b9a84352726954fc3ce5820b4ee3f4e6751dbd6004e3ea4835c45cbd6',
    callback: 'http://127.0.0.1:3000/unsplash'
  });

  constructor() { }

  public getPicture(filter: string) {
    return from(this.unsplash.search.photos(filter, 0).then( res => res.json())).pipe(
      map( (res: any) => {
        return res.results.map( r => ({ url: r.urls.small }) );
      })
    );
  }

}
