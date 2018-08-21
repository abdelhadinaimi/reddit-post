import { IPostAction, ISubredditAction } from "../types/actions";
import { IPost, IState } from "../types/interfaces";
import { fetchSubredditError, resetErrorMessage } from "./errorActions";

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

function receivePosts(subreddit: string, posts: IPost[]): IPostAction {
  return {
    posts,
    receivedAt: Date.now(),
    subreddit,
    type: RECEIVE_POSTS
  };
}

 function fetchPosts(subreddit: string) {
  return (dispatch: (action: any) => void) => {
    dispatch(requestPosts(subreddit));

    return fetch(`https://www.reddit.com/r/${subreddit}/new.json`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then(json =>
        dispatch(
          receivePosts(
            subreddit,
            json.data.children.map((child: any) => child.data)
          )
        )
      )
      .catch(err => dispatch(fetchSubredditError(subreddit)));
  };
}

function shouldFetchPosts(state: IState, subreddit: string): boolean {
  const post = state.postsBySubreddit[subreddit];

  if (post.isFetching) {
    // the subreddit didn't fetch yet
    return false;
  } else if (post.items.length === 0) {
    // the subreddit is in the middle of a fetch request
    return true;
  } else {
    // the subreddit is in need of fetching
    return post.didInvalidate;
  }
}
export function fetchPostsIfNeeded(subreddit: string) {
  return (dispatch: (action: any) => Promise<any>, getState: () => any) => {
    dispatch(resetErrorMessage());

    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
    
    return Promise.resolve();
    
  };
}
