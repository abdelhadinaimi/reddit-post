import * as actions from "../../src/actions/errorActions";

describe("actions", () => {
  it("should create an action to reset the error message", () => {
    const expectedAction = {
      type : actions.RESET_ERROR_MESSAGE
    }
    expect(actions.resetErrorMessage()).toEqual(expectedAction);
  });
});