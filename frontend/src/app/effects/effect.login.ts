/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {LoginService} from "../services/service.login";
import {TypeLogin} from "../types/type.login";
import {loginError, loginSuccess} from "../actions/action.login";

@Injectable({
  providedIn: 'root',
})
export class EffectLogin {
  public login$ = createEffect(() =>
    this.action.pipe(ofType(TypeLogin.login),
      mergeMap((payload) => this.loginService.createLogin(payload).pipe(catchError((e) => of(e)))),
      map((payload) => {
        if (payload instanceof HttpErrorResponse) {
          return loginError({payload});
        }
        return loginSuccess({payload});
      }),
    ));

  constructor(
    private action: Actions,
    private loginService: LoginService,
  ) {
  }
}
