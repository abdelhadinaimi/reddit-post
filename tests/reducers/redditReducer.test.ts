import reducer from "../../src/reducers/redditReducer";

import { ADD_SUBREDDIT, REMOVE_SUBREDDIT } from "../../src/actions/listActions";
import * as actions from "../../src/actions/redditActions";

import { IPostAction, redditAction } from "../../src/types/actions";
import { IPost, IPostBySubreddit } from "../../src/types/interfaces";

const defaultPostsState: IPostBySubreddit = {
  didInvalidate: false,
  error: false,
  hasNewPost: false,
  isFetching: false,
  items: [],
  lastUpdated: 0
};

describe("error reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as redditAction)).toEqual({});
  });

  it("should handle INVALIDATE_SUBREDDIT", () => {
    const action = { type: actions.INVALIDATE_SUBREDDIT,subreddit: "all" } as IPostAction;

    expect(reducer({}, action)).toEqual({});

    const defaultState = {
      all: {
        didInvalidate: false,
        error: true,
        hasNewPost: true,
        isFetching: false,
        items: [],
        lastUpdated: 0
      }
    }
    const reducerResult = reducer(defaultState,action);
    expect(reducerResult.all).toEqual({
      didInvalidate: true,
      error: false,
      hasNewPost: false,
      isFetching: false,
      items: [],
      lastUpdated: 0
    });
  });

  it("should handle REQUEST_POSTS", () => {
    const action = { type: actions.REQUEST_POSTS, subreddit: "all" } as IPostAction;

    expect(reducer({}, action)).toEqual({});

    const defaultState = {
      all: {
        didInvalidate: true,
        error: true,
        hasNewPost: true,
        isFetching: false,
        items: [],
        lastUpdated: 0
      }
    }
    const reducerResult = reducer(defaultState,action);
    expect(reducerResult.all).toEqual({
      didInvalidate: false,
      error: false,
      hasNewPost: false,
      isFetching: true,
      items: [],
      lastUpdated: 0
    });
  });

  it("should handle RECEIVE_POSTS", () => {
    const action = {
      posts: [ { id : 0 } ],
      receivedAt: 5,
      subreddit: "all",
      type: actions.RECEIVE_POSTS
    } as IPostAction;

    expect(reducer({}, action)).toEqual({});

    const defaultStateNoItems = {
      all: {
        didInvalidate: true,
        error: true,
        hasNewPost: true,
        isFetching: true,
        items: [],
        lastUpdated: 0
      }
    }
    const reducerResultNoItems = reducer(defaultStateNoItems,action);
    expect(reducerResultNoItems.all).toEqual({
      didInvalidate: false,
      error: false,
      hasNewPost: false,
      isFetching: false,
      items: [ { id : 0 } ],
      lastUpdated: 5
    });

    const defaultStateWithItems = {
      all: {
        didInvalidate: true,
        error: true,
        hasNewPost: true,
        isFetching: true,
        items: [{ id : 1} as IPost],
        lastUpdated: 0
      }
    }
    const reducerResultWithItems = reducer(defaultStateWithItems,action);
    expect(reducerResultWithItems.all).toEqual({
      didInvalidate: false,
      error: false,
      hasNewPost: true,
      isFetching: false,
      items: [{ id : 0 }],
      lastUpdated: 5
    });
    
  });

  it("should handle FETCH_SUBREDDIT_ERROR", () => {
    const action = { type: actions.FETCH_SUBREDDIT_ERROR, subreddit: "all" } as IPostAction;

    expect(reducer({}, action)).toEqual({});

    const defaultState = {
      all: {
        didInvalidate: false,
        error: false,
        hasNewPost: false,
        isFetching: true,
        items: [],
        lastUpdated: 0
      }
    }
    const reducerResult = reducer(defaultState,action);
    expect(reducerResult.all).toEqual({
      didInvalidate: false,
      error: true,
      hasNewPost: false,
      isFetching: false,
      items: [],
      lastUpdated: 0
    });
  });

  it("should handle ADD_SUBREDDIT", () => {
    const action = { type: ADD_SUBREDDIT, subreddit: "all" } as IPostAction;

    expect(reducer({}, action)).toEqual({ all: defaultPostsState });

    const defaultState = {
      all: {
        didInvalidate: false,
        error: false,
        hasNewPost: false,
        isFetching: true,
        items: [],
        lastUpdated: 0
      }
    };
    expect(reducer(defaultState, action)).toEqual(defaultState);
  });

  it("should handle REMOVE_SUBREDDIT", () => {
    const action = { type: REMOVE_SUBREDDIT, subreddit: "all" } as IPostAction;

    expect(reducer({}, action)).toEqual({});

    const defaultState = {
      all: {
        didInvalidate: false,
        error: false,
        hasNewPost: false,
        isFetching: true,
        items: [],
        lastUpdated: 0
      },
      hello: {
        didInvalidate: false,
        error: false,
        hasNewPost: false,
        isFetching: true,
        items: [],
        lastUpdated: 0
      }
    };
    expect(reducer(defaultState, action)).toEqual({
      hello: {
        didInvalidate: false,
        error: false,
        hasNewPost: false,
        isFetching: true,
        items: [],
        lastUpdated: 0
      }
    });
  });
});
