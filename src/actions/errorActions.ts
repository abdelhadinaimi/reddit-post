import { Action } from "redux";
import { ISubredditAction } from "../types/actions";

export const FETCH_SUBREDDIT_ERROR = "FETCH_SUBREDDIT_ERROR";
export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";


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
