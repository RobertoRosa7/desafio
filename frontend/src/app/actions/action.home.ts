import {createAction, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeHome} from "../types/type.home";

export const homeRead = createAction(TypeHome.homeRead);
export const homeReadSuccess = createAction(TypeHome.homeReadSuccess, props<{ payload: any }>());
export const homeReadError = createAction(TypeHome.homeReadError, props<{ payload: any | HttpErrorResponse }>());

export const homeCreate = createAction(TypeHome.homeCreate, props<{ payload: any }>());
export const homeCreateSuccess = createAction(TypeHome.homeCreateSuccess, props<{ payload: any }>());
export const homeCreateError = createAction(TypeHome.homeCreateError, props<{ payload: any }>());


export const homeUpdate = createAction(TypeHome.homeUpdate, props<{ payload: any }>());
export const homeUpdateError = createAction(TypeHome.homeUpdateError, props<{ payload: any }>());


export const homeDelete = createAction(TypeHome.homeDelete, props<{ payload: any }>());
export const homeDeleteError = createAction(TypeHome.homeDeleteError, props<{ payload: any }>());

