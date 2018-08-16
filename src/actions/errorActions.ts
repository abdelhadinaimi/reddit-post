import { Action } from "redux";
import { IErrorAction, ISubredditAction } from "../types/actions";

export const ADD_SUBREDDIT_ERROR = "ADD_SUBREDDIT_ERROR";
export const FETCH_ERROR = "FETCH_ERROR";
export const FETCH_SUBREDDIT_ERROR = "FETCH_SUBREDDIT_ERROR";
export const SUBREDDIT_EXIST_ERROR = "SUBREDDIT_EXIST_ERROR";
export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";

export function addSubredditError(error: string): IErrorAction {
  return {
    error,
    type: ADD_SUBREDDIT_ERROR
  };
}
export function fetchError(error: string): IErrorAction {
  return {
    error,
    type: FETCH_ERROR
  };
}
export function subredditExistError(error: string): IErrorAction {
  return {
    error,
    type: SUBREDDIT_EXIST_ERROR
  };
}
export function resetErrorMessage(): Action {
  return {
    type: RESET_ERROR_MESSAGE
  };
}
export function fetchSubredditError(subreddit: string): ISubredditAction {
  return {
    subreddit,
    type: FETCH_SUBREDDIT_ERROR
  };
}
