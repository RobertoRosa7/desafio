import {ActionReducerMap} from '@ngrx/store';
import {reducerHome} from "../reducers/reducer.home";
import {reducerLogin} from "../reducers/reducer.login";

export const rootStore: ActionReducerMap<any> = {
  home: reducerHome,
  login: reducerLogin,
};
