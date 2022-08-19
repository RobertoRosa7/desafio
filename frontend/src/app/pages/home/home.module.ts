import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginGuards} from "../../guards/guard.login";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../../material.module";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoginGuards]},
];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MaterialModule
  ]
})
export class HomeModule {
}
