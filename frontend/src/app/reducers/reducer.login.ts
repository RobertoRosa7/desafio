import {createReducer, on} from '@ngrx/store';
import {loginError, loginSuccess} from "../actions/action.login";
import {LoginResponse} from "../interfaces/login";

const INITIAL_STATES: LoginResponse = {
  error: false,
  message: '',
  data: null
};

const reducer = createReducer(
  INITIAL_STATES,

  on(loginSuccess, (state, {payload}) => ({
    ...state,
    error: payload.error,
    message: payload.message,
    data: payload.data
  })),

  on(loginError, (state, {payload}) => ({
    ...state,
    error: payload.error,
    message: payload.message,
  }))
);

export const reducerLogin = (state: any, action: any) => reducer(state, action);
