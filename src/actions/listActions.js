export const ADD_SUBREDDIT_SUCCESS = "ADD_SUBREDDIT";
export const REMOVE_SUBREDDIT = "REMOVE_SUBREDDIT";

export function removeSubreddit(subreddit) {
  return {
    subreddit,
    type: REMOVE_SUBREDDIT
  };
}
