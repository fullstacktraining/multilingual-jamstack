import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StoryblokService } from 'src/app/storyblok.service';
import { buildUrl } from 'cloudinary-build-url';
import { switchMap, pluck } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article$: any | undefined;
  constructor(
    private sbService: StoryblokService,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) public locale: string
  ) {
    // if (!environment.production) {
    //   window.storyblok.init();
    //   window.storyblok.on(['change', 'published'], function () {
    //     location.reload();
    //   });
    // }
  }

  ngOnInit(): void {
    const starts_with = this.locale.includes('en')
      ? 'articles'
      : `${this.locale}/articles`;
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.sbService
          .getStory(`articles/${params.get('slug')}`, {
            starts_with,
          })
          .pipe(pluck('data'))
          .pipe(pluck('story'));
      })
    );
  }

  loadImage(article: any) {
    return buildUrl(article.content.author_image, {
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
// import { ActivatedRoute, ParamMap } from '@angular/router';
// import { StoryblokService } from 'src/app/storyblok.service';
// import { buildUrl } from 'cloudinary-build-url';
// import { environment } from './../../../environments/environment';
// import { switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-article',
//   templateUrl: './article.component.html',
//   styleUrls: ['./article.component.css'],
// })
// export class ArticleComponent implements OnInit {
//   article$: Observable<any> | undefined;
//   constructor(
//     private sbService: StoryblokService,
//     private route: ActivatedRoute,
//     @Inject(LOCALE_ID) public locale: string
//   ) {
//     if (!environment.production) {
//       // window.storyblok.init();
//       // window.storyblok.on(['change', 'published'], function () {
//       //   location.reload();
//       // });
//     }
//   }

//   ngOnInit(): void {
//     this.article$ = this.route.paramMap.pipe(
//       switchMap((params: ParamMap) => {
//         console.log('sv', this.sbService.getStory(params.get('slug')));
//         return this.sbService.getStory(params.get('slug'));
//       })
//     );
//   }

//   loadImage(article: any) {
//     return buildUrl(article.content.author_image, {
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
