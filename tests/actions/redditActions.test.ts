import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  FETCH_SUBREDDIT_ERROR,
  RESET_ERROR_MESSAGE
} from "../../src/actions/errorActions";
import {
  fetchPostsIfNeeded,
  INVALIDATE_SUBREDDIT,
  invalidateSubreddit,
  RECEIVE_POSTS,
  REQUEST_POSTS
} from "../../src/actions/redditActions";

import { AnyAction } from "redux";
import { IPostBySubreddit } from "../../src/types/interfaces";

const mockStore = configureMockStore([thunk]);
const subreddit = "all";

const now = Date.now();
Date.now = jest.fn().mockReturnValue(now); // mockin the date

const children = [
  {
    data: { id: 0, permalink: "/r/test0", title: "this is test 0" }
  },
  {
    data: { id: 1, permalink: "/r/test1", title: "this is test 1" }
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
});

const defaultPostsState: IPostBySubreddit = {
  didInvalidate: false,
  error: false,
  hasNewPost: false,
  isFetching: false,
  items: [],
  lastUpdated: 0
};

describe("fetchPostsIfNeeded()", () => {
  beforeEach(() => {
    fetchMock.restore();
  });
  const defaultStore = {
    postsBySubreddit: {
      all: defaultPostsState
    }
  };
  /**
   * Runs a expect().toEqual test to see if expectedActions is equal to store.getActions() for
   * fetchPostsIfNeeded()
   */
  const expectActionsTobe = (
    expectedActions: AnyAction[],
    mockedStore: any
  ) => {
    const store = mockStore(mockedStore);
    return fetchPostsIfNeeded(subreddit)(store.dispatch, store.getState).then(
      () => {
        expect(store.getActions()).toEqual(expectedActions);
      }
    );
  };

  /**
   * Takes successConditions mutates them to the state and tests them with expectActionsTobe()
   */
  const runConditionsOnExpectedActions = (successConditions: any[]) => (
    expectedActions: AnyAction[],
    mockedStore: any
  ) =>
    successConditions.map(e => {
      const cStore = JSON.parse(JSON.stringify(mockedStore));
      cStore.postsBySubreddit.all = Object.assign({}, defaultPostsState, e);
      return expectActionsTobe(expectedActions, cStore);
    });

  it("should return a RECEIVE_POSTS if the subreddit needs to be fetched", () => {
    fetchMock.mock(`https://www.reddit.com/r/${subreddit}/new.json`, {
      body: { data: { children } }
    });
    const expectedActions = [
      { type: RESET_ERROR_MESSAGE },
      { type: REQUEST_POSTS, subreddit },
      {
        posts: children.map(child => child.data),
        receivedAt: now,
        subreddit,
        type: RECEIVE_POSTS
      }
    ];

    const successConditions = [, { didInvalidate: true, items: [1] }];
    const promiseMap = runConditionsOnExpectedActions(successConditions)(
      expectedActions,
      defaultStore
    );
    return Promise.all(promiseMap);
  });

  it("should only dispatch RESET_ERROR_MESSAGE if it doesn't need to be fetched", () => {
    fetchMock.mock(`https://www.reddit.com/r/${subreddit}/new.json`, {
      body: { data: { children } }
    });
    const expectedActions = [{ type: RESET_ERROR_MESSAGE }];

    // if it is fetching or if there is something in the array and didInvalidate is false
    const successConditions = [{ isFetching: true }, { items: [1] }];
    const promiseMap = runConditionsOnExpectedActions(successConditions)(
      expectedActions,
      defaultStore
    );
    return Promise.all(promiseMap);
  });

  it("should return FETCH_SUBREDDIT_ERROR if there was any kind of error during the fetch", () => {
    fetchMock.mock(`https://www.reddit.com/r/${subreddit}/new.json`, {
      body: { data: { children } },
      status : 404
    });
    const expectedActions = [
      { type: RESET_ERROR_MESSAGE },
      { type: REQUEST_POSTS, subreddit },
      { type: FETCH_SUBREDDIT_ERROR, subreddit }
    ];

    return expectActionsTobe(expectedActions, defaultStore);
  });
});
