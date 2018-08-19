import { ISubredditAction } from "../types/actions";

export const ADD_SUBREDDIT = "ADD_SUBREDDIT";
export const REMOVE_SUBREDDIT = "REMOVE_SUBREDDIT";

export function removeSubreddit(subreddit: string): ISubredditAction {
  return {
    subreddit,
    type: REMOVE_SUBREDDIT
  };
}

export function addSubreddit(subreddit: string): ISubredditAction {
  return {
    subreddit,
    type: ADD_SUBREDDIT
  };
}
