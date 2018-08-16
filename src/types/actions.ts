import { Action } from "redux";

export interface IErrorAction extends Action {
  error : string;
}

export interface ISubredditAction extends Action {
  subreddit : string;
}