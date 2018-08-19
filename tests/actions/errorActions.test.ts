import * as actions from "../../src/actions/errorActions";

describe("actions", () => {
  it("should create an action to reset the error message", () => {
    const expectedAction = {
      type : actions.RESET_ERROR_MESSAGE
    }
    expect(actions.resetErrorMessage()).toEqual(expectedAction);
  });

  it("should create an action that means an error while fetching happened", () => {
    const subreddit = "all";
    const expectedAction = {
      subreddit,
      type : actions.FETCH_SUBREDDIT_ERROR,
    }
    expect(actions.fetchSubredditError(subreddit)).toEqual(expectedAction);
  });
});