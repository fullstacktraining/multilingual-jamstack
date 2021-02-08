import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ArticleComponent } from './article/article.component';
import { StoryblokDirective } from '../storyblok.directive';

@NgModule({
  declarations: [ArticlesComponent, ArticleComponent, StoryblokDirective],
  imports: [CommonModule, ArticlesRoutingModule],
  providers: [StoryblokDirective],
})
export class ArticlesModule {}
