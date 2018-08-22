import { Action } from "redux";

export interface IErrorAction extends Action {
  error: string;
}

export interface ISubredditAction extends Action {
  subreddit: string;
}

export interface IDelayAction extends Action {
  delay: number;
}

export interface INotificationAction extends Action {
  message: string;
}

export interface IPostAction extends ISubredditAction {
  posts: any;
  receivedAt: number;
}

export type redditAction = IPostAction & ISubredditAction;

