import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {Home} from "../interfaces/home";
import {Cards} from "../interfaces/cards";

const todoList = (states: Home): Cards[] => states.todoList;
const doingList = (states: Home): Cards[] => states.doingList;
const doneList = (states: Home): Cards[] => states.doneList;

const home: MemoizedSelector<object, Home> = createFeatureSelector<Home>('home');

export const selectTodoList: MemoizedSelector<object, Cards[]> = createSelector(home, todoList);
export const selectDoingList: MemoizedSelector<object, Cards[]> = createSelector(home, doingList);
export const selectDoneList: MemoizedSelector<object, Cards[]> = createSelector(home, doneList);
