import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { RESET_ERROR_MESSAGE } from "../../src/actions/errorActions";
import {
  INVALIDATE_SUBREDDIT,
  invalidateSubreddit,
  RECEIVE_POSTS,
  REQUEST_POSTS
} from "../../src/actions/redditActions";
import { IPostBySubreddit } from "../../src/types/interfaces";

const mockStore = configureMockStore([thunk]);

const subreddit = "all";

describe("actions", () => {
  it("should create an action to invalidate a subreddit", () => {
    const expectedAction = {
      subreddit,
      type: INVALIDATE_SUBREDDIT
    };
    expect(invalidateSubreddit(subreddit)).toEqual(expectedAction);
  });
});

const children = [
  {
    permalink: "/r/test"
  },
  {
    permalink: "/r/test2"
  }
];
const defaultPostsState: IPostBySubreddit = {
  didInvalidate: false,
  error: false,
  hasNewPost: false,
  isFetching: false,
  items: [],
  lastUpdated: Date.now()
};

describe("fetchPostsIfNeeded()", () => {
  
  it("should create RECEIVE_POSTS action when the fetch is done", () => {
    // fetchMock.mock(`/{$subreddit}/new.json`, {
    //   body: { data: { children } },
    //   headers: { "content-type": "application/json" }
    // });
    // tslint:disable-next-line:no-console
    console.log(fetchMock);
    const expectedActions = [
      { type: RESET_ERROR_MESSAGE },
      { type: REQUEST_POSTS, subreddit },
      {
        posts: children,
        receivedAt: Date.now(),
        subreddit,
        type: RECEIVE_POSTS
      }
    ];
    const store = mockStore({
      postsBySubreddit: { all: Object.assign(defaultPostsState, { posts : children }) }
    });

  });
});
