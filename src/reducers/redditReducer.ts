import { ADD_SUBREDDIT, REMOVE_SUBREDDIT } from "../actions/listActions";
import { FETCH_SUBREDDIT_ERROR,INVALIDATE_SUBREDDIT,RECEIVE_POSTS,REQUEST_POSTS} from "../actions/redditActions";

import { redditAction } from "../types/actions";
import { IPostBySubreddit, IPostsBySubreddit } from "../types/interfaces";

// Default state for a single subreddit
const defaultPostsState : IPostBySubreddit = {
  didInvalidate: false,
  error: false,
  hasNewPost: false,
  isFetching: false,
  items: [],
  lastUpdated : 0
};

function postBySubreddit(state = defaultPostsState, action : redditAction) : IPostBySubreddit{
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
        error: false,
        hasNewPost: false
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        didInvalidate: false,
        error: false,
        hasNewPost: false,
        isFetching: true
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        didInvalidate: false,
        error: false,
        hasNewPost: state.items.length !== 0 && action.posts[0].id !== state.items[0].id,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    case FETCH_SUBREDDIT_ERROR:
      return Object.assign({}, state, {
        error: true,
        isFetching: false
      });
    default:
      return state;
  }
}

const defaultState : IPostsBySubreddit = {};
/* Reducer for every post in the posts array of our state*/
export default function postsBySubreddit(state = defaultState, action : redditAction) : IPostsBySubreddit{
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
    case FETCH_SUBREDDIT_ERROR:
      if (!state[action.subreddit]) {
        // if we receive an action and the subreddit does not exist we return the state.
        return state;
      }
    case ADD_SUBREDDIT :
      return Object.assign({}, state, {
        [action.subreddit]: postBySubreddit(state[action.subreddit], action)
      });
    case REMOVE_SUBREDDIT: {
      const newState = Object.assign({}, state);
      delete newState[action.subreddit];
      return newState;
    }

    default:
      return state;
  }
}
