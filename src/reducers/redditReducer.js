import {
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from "../actions/redditActions";
import { REMOVE_SUBREDDIT } from "../actions/listActions";
import { FETCH_SUBREDDIT_ERROR } from "../actions/errorActions";

const defaultState = {
  didInvalidate: false,
  error: false,
  hasNewPost: false,
  isFetching: false,
  items: []
};

/* Reducer for a post in the posts array of our state*/
function posts(state = defaultState, action) {
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
        hasNewPost:
          state.items.length !== 0 && action.posts[0].id !== state.items[0].id,
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

/* Reducer for every post in the posts array of our state*/
export default function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
      if (!state[action.subreddit]) {
        //this is if we receive a post and the the object does not exist we return the state.
        return state;
      }
    case REQUEST_POSTS:
    case FETCH_SUBREDDIT_ERROR:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
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
