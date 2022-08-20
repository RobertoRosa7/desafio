import {createReducer, on} from '@ngrx/store';
import {homeCreateSuccess, homeReadError, homeReadSuccess} from "../actions/action.home";

const INITIAL_STATES = {
  data: null,
  error: null,
  message: '',
  todoList: [],
  doingList: [],
  doneList: []
};

const reducer = createReducer(
  INITIAL_STATES,

  on(homeReadSuccess, (states, {payload}) => ({
    ...states,
    data: payload.data,
    todoList: payload.data.filter((value: any) => value.status === 'todo'),
    doingList: payload.data.filter((value: any) => value.status === 'doing'),
    doneList: payload.data.filter((value: any) => value.status === 'done'),
  })),

  on(homeReadError, (states, {payload}) => ({
    ...states,
    error: payload.error,
    message: payload.message
  })),
);

export const reducerHome = (state: any, action: any) => reducer(state, action);
