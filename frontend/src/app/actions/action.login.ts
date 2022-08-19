import {TypeLogin} from "../types/type.login";
import {createAction, props} from "@ngrx/store";
import {Login, LoginResponse} from "../interfaces/login";
import {HttpErrorResponse} from "@angular/common/http";

export const login = createAction(TypeLogin.login, props<{ payload: Login }>());
export const loginSuccess = createAction(TypeLogin.loginSuccess, props<{ payload: LoginResponse }>());
export const loginError = createAction(TypeLogin.loginError, props<{ payload: LoginResponse | HttpErrorResponse }>());
