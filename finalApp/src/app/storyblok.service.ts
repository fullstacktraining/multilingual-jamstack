import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { from } from 'rxjs';
// import Client from 'storyblok-js-client';

@Injectable({
  providedIn: 'root',
})
export class StoryblokService {
  // private sbClient = new Client({
  //   accessToken: 'ADD_YOUR_TOKEN_HERE',
  // });

  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  starts_with = this.locale.includes('en') ? 'articles' : 'es/articles';
  getStory(slug: string | null, params?: object) {
    // return from(this.sbClient.getStory(slug!, params));
    return this.http.get(
      `https://api.storyblok.com/v1/cdn/stories${this.starts_with}/${slug}?version=published&cv=1612791800065&token=ADD_YOUR_TOKEN_HERE`
    );
  }

  getStories(params?: object) {
    // return from(this.sbClient.getStories(params));
    return this.http.get(
      `https://api.storyblok.com/v1/cdn/stories?starts_with=${this.starts_with}?version=published&cv=1612791800065&token=ADD_YOUR_TOKEN_HERE`
    );
  }
}
