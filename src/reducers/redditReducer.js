import { INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS } from '../actions/redditActions';
import { REMOVE_SUBREDDIT } from '../actions/listActions';
import { FETCH_SUBREDDIT_ERROR } from '../actions/errorActions';

const defaultState = {
    error : false,
    isFetching: false,
    didInvalidate: false,
    hasNewPost: false,
    items: []
  };

  /* Reducer for a post in the posts array of our state*/
function posts(state = defaultState,action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        error : false,
        didInvalidate: true,
        hasNewPost: false
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        error : false,
        isFetching: true,
        didInvalidate: false,
        hasNewPost: false
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        error: false,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        hasNewPost: state.items.length !== 0 && action.posts[0].id !== state.items[0].id,
        lastUpdated: action.receivedAt
      });
    case FETCH_SUBREDDIT_ERROR:
      return Object.assign({}, state, {
        error : true,
        isFetching: false,
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
      if(!state[action.subreddit]) return state;//this is if we receive a post and the the object does not exist we return the state.
    case REQUEST_POSTS:
    case FETCH_SUBREDDIT_ERROR:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      });
    case REMOVE_SUBREDDIT : {
      const newState = Object.assign({},state);
      delete newState[action.subreddit];
      return newState;
    }

    default:
      return state;
  }
}
