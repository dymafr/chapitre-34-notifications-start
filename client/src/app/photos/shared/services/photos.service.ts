import { Injectable } from "@angular/core";
import { createApi } from "unsplash-js";
import { from } from "rxjs";

@Injectable()
export class PhotosService {
  private unsplash = createApi({
    accessKey:
      "4e22697a6a1b033e06b2ede7c43fc8a457cc14e265d3870c627ca34bd366446d",
  });

  constructor() {}

  public getPictures(filter: string) {
    return from(
      this.unsplash.search
        .getPhotos({ query: filter, page: 1, perPage: 10 })
        .then((res) => res.response.results.map((r) => ({ url: r.urls.small })))
    );
  }
}
