import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {HomeService} from "../services/service.home";
import {
  homeCreateError,
  homeDeleteError,
  homeRead,
  homeReadError,
  homeReadSuccess,
  homeUpdateError
} from "../actions/action.home";
import {TypeHome} from "../types/type.home";

@Injectable({
  providedIn: 'root',
})
export class EffectHome {
  public home$ = createEffect(() =>
    this.action.pipe(ofType(TypeHome.homeRead),
      mergeMap(() => this.homeService.read().pipe(catchError((e) => of(e)))),
      map((payload) => {
        if (payload instanceof HttpErrorResponse) {
          return homeReadError({payload});
        }
        return homeReadSuccess({payload});
      }),
    ));

  public create$ = createEffect(() =>
    this.action.pipe(ofType(TypeHome.homeCreate),
      mergeMap((payload) => this.homeService.create(payload).pipe(catchError((e) => of(e)))),
      map((payload) => {
        if (payload instanceof HttpErrorResponse) {
          return homeCreateError({payload});
        }
        return homeRead();
      }),
    ));

  public update$ = createEffect(() =>
    this.action.pipe(ofType(TypeHome.homeUpdate),
      mergeMap(({payload}) => this.homeService.update(payload).pipe(catchError((e) => of(e)))),
      map((payload) => {
        if (payload instanceof HttpErrorResponse) {
          return homeUpdateError({payload});
        }
        return homeRead();
      }),
    ));

  public delete = createEffect(() =>
    this.action.pipe(ofType(TypeHome.homeDelete),
      mergeMap(({payload}) => this.homeService.remove(payload).pipe(catchError((e) => of(e)))),
      map((payload) => {
        if (payload instanceof HttpErrorResponse) {
          return homeDeleteError({payload});
        }
        return homeRead();
      }),
    ));


  constructor(
    private action: Actions,
    private homeService: HomeService,
  ) {
  }
}
