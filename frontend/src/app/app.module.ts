import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Constants} from "./services/service.constants";
import {MaterialModule} from "./material.module";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {rootStore} from "./stores/store";
import {HomeInterceptor} from "./interceptors/interceptor.home";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(rootStore)
  ],
  providers: [Constants, {provide: HTTP_INTERCEPTORS, useClass: HomeInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
