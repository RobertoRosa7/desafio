import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {LoginResponse, Token} from "../interfaces/login";

const getError = (states: LoginResponse): boolean => states.error;
const getSuccess = (states: LoginResponse): Token | null => states.data;

const login: MemoizedSelector<object, LoginResponse> = createFeatureSelector<LoginResponse>('login');

export const selectError: MemoizedSelector<object, boolean> = createSelector(login, getError);
export const selectSuccess: MemoizedSelector<object, Token | null> = createSelector(login, getSuccess);
