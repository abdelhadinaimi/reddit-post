import * as fetchMock from 'fetch-mock'
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  fetchPosts,
  INVALIDATE_SUBREDDIT,
  invalidateSubreddit,
  RECEIVE_POSTS,
  receivePosts,
  REQUEST_POSTS,
  requestPosts,
} from "../../src/actions/redditActions";
import { IPostBySubreddit } from "../../src/types/interfaces";

const mockStore = configureMockStore([thunk]);
const subreddit = "all";

const now = Date.now();
Date.now = jest.fn().mockReturnValue(now); // mockin the date

const children = [
  {
    data : { id: 0, permalink: "/r/test0", title : "this is test 0" },
  },
  {
    data : { id: 1, permalink: "/r/test1",title : "this is test 1" },
  }
];

describe("simple actions", () => {
  it("invalidateSubreddit() should create an action to invalidate a subreddit", () => {
    const expectedAction = {
      subreddit,
      type: INVALIDATE_SUBREDDIT
    };
    expect(invalidateSubreddit(subreddit)).toEqual(expectedAction);
  });
  
  it("requestPosts() should create an action to request subreddit data", () => {
    const expectedAction = {
      subreddit,
      type: REQUEST_POSTS
    };
    expect(requestPosts(subreddit)).toEqual(expectedAction);
  });

  it("receivePosts() should create an action to request subreddit data", () => {
    const posts = children.map(child => child.data);
    const expectedAction = {
      posts,
      receivedAt: now,
      subreddit,
      type: RECEIVE_POSTS
    };
    expect(receivePosts(subreddit,posts)).toEqual(expectedAction);
  });
});

const defaultPostsState: IPostBySubreddit = {
  didInvalidate: false,
  error: false,
  hasNewPost: false,
  isFetching: false,
  items: [],
  lastUpdated: 0
};

describe("thunk actions", () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it("fetchPosts() should create RECEIVE_POSTS action when the fetch is done", () => {
    
    fetchMock.mock(`https://www.reddit.com/r/${subreddit}/new.json`,{ body:{data:{children}}});

    const expectedActions = [
      { type: REQUEST_POSTS, subreddit },
      {
        posts: children.map(child => child.data),
        receivedAt: now,
        subreddit,
        type: RECEIVE_POSTS
      }
    ];
    const store = mockStore({
      postsBySubreddit: {
        all: defaultPostsState
      }
    });
    
    return fetchPosts(subreddit)(store.dispatch).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
