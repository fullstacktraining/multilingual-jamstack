import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { StoryblokService } from '../storyblok.service';
import { buildUrl } from 'cloudinary-build-url';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  constructor(
    private sbService: StoryblokService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    const starts_with = this.locale.includes('en')
      ? `articles`
      : `${this.locale}/articles`;
    this.sbService
      .getStories({
        // version: 'draft',
        starts_with,
      })
      .subscribe(({ data }) => (this.articles = data.stories));
  }

  loadImage(publicID: string) {
    return buildUrl(publicID, {
      cloud: {
        cloudName: 'tamas-demo',
      },
      transformations: {
        gravity: 'face',
        resize: {
          type: 'thumb',
          width: 50,
          height: 50,
        },
      },
    });
  }
}

// import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
// import { StoryblokService } from '../storyblok.service';
// import { buildUrl } from 'cloudinary-build-url';

// @Component({
//   selector: 'app-articles',
//   templateUrl: './articles.component.html',
//   styleUrls: ['./articles.component.css'],
// })
// export class ArticlesComponent implements OnInit {
//   articles: any[] = [];
//   constructor(
//     private sbService: StoryblokService,
//     @Inject(LOCALE_ID) private locale: string
//   ) {}

//   ngOnInit(): void {
//     console.log('this.locale', this.locale);
//     console.log('this.locale.includes(en)', this.locale.includes('en'));
//     this.sbService
//       .getStories()
//       .subscribe((data: any) => (this.articles = data.stories));
//   }

//   loadImage(publicID: string) {
//     return buildUrl(publicID, {
//       cloud: {
//         cloudName: 'tamas-demo',
//       },
//       transformations: {
//         gravity: 'face',
//         resize: {
//           type: 'thumb',
//           width: 50,
//           height: 50,
//         },
//       },
//     });
//   }
// }
