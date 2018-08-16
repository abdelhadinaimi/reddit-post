import { ISubredditAction } from "../types/actions";

export const ADD_SUBREDDIT_SUCCESS = "ADD_SUBREDDIT";
export const REMOVE_SUBREDDIT = "REMOVE_SUBREDDIT";

export function removeSubreddit(subreddit: string): ISubredditAction {
  return {
    subreddit,
    type: REMOVE_SUBREDDIT
  };
}
