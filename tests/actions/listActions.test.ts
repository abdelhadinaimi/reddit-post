import * as actions from "../../src/actions/listActions";

const subreddit = "all";

describe("actions", () => {
  it("should create an action to add a new subreddit", () => {
    const expectedAction = {
      subreddit,
      type: actions.ADD_SUBREDDIT
    };
    expect(actions.addSubreddit(subreddit)).toEqual(expectedAction);
  });

  it("should create an action to remove a subreddit", () => {
    const expectedAction = {
      subreddit,
      type: actions.REMOVE_SUBREDDIT
    };
    expect(actions.removeSubreddit(subreddit)).toEqual(expectedAction);
  });
});
