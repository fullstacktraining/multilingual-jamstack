import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, LangSelectorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule.forRoot({ manualIdle: true }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
