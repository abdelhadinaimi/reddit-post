import { IPostAction, ISubredditAction } from "../types/actions";
import {
  fetchError,
  fetchSubredditError,
  resetErrorMessage
} from "./errorActions";

export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export function invalidateSubreddit(subreddit: string): ISubredditAction {
  return {
    subreddit,
    type: INVALIDATE_SUBREDDIT
  };
}

function requestPosts(subreddit: string): ISubredditAction {
  return {
    subreddit,
    type: REQUEST_POSTS
  };
}

function receivePosts(subreddit: string, json: any): IPostAction {
  return {
    posts: json.data.children.map((child: any) => child.data),
    receivedAt: Date.now(),
    subreddit,
    type: RECEIVE_POSTS
  };
}

export function fetchPosts(subreddit: string) {
  return (dispatch: (action: any) => void) => {
    dispatch(requestPosts(subreddit));

    return fetch(`https://www.reddit.com/r/${subreddit}/new.json`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then(json => {
        dispatch(receivePosts(subreddit, json));
      })
      .catch(err => {
        dispatch(fetchError(err.message));
        dispatch(fetchSubredditError(subreddit));
      });
  };
}

function shouldFetchPosts(state: any, subreddit: string): boolean {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}
export function fetchPostsIfNeeded(subreddit: string) {
  return (dispatch: (action: any) => void, getState: () => any) => {
    dispatch(resetErrorMessage());
    if (shouldFetchPosts(getState(), subreddit)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPosts(subreddit));
    } else {
      return Promise.resolve();
    }
  };
}
