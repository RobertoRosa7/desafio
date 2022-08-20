import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginGuards} from "../../guards/guard.login";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../../material.module";
import {EffectsModule} from "@ngrx/effects";
import {EffectHome} from "../../effects/effect.home";
import { CardComponent } from '../../components/card/card.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoginGuards]},
];


@NgModule({
  declarations: [HomeComponent, CardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MaterialModule,
    EffectsModule.forFeature([EffectHome])
  ]
})
export class HomeModule {
}
