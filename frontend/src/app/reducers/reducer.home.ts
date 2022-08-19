import {createReducer} from '@ngrx/store';

const INITIAL_STATES = {};

const reducer = createReducer(
  INITIAL_STATES,
);

export const reducerHome = (state: any, action: any) => reducer(state, action);
