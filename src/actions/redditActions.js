import {
  fetchError,
  fetchSubredditError,
  resetErrorMessage
} from "./errorActions";

export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export function fetchPosts(subreddit) {
  return function(dispatch) {
    dispatch(requestPosts(subreddit));

    return fetch(`https://www.reddit.com/r/${subreddit}/new.json`)
      .then(response => {
        if (response.ok) return response.json();

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

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}
export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    dispatch(resetErrorMessage());
    if (shouldFetchPosts(getState(), subreddit)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPosts(subreddit));
    } else {
      return Promise.resolve();
    }
  };
}
