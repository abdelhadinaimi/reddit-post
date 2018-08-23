import * as actions from "../../src/actions/settingsActions";

describe("actions", () => {
  it("should create an action to toggle the sound on and off", () => {
    const expectedAction = {
      type: actions.TOGGLE_SOUND
    };
    expect(actions.toggleSound()).toEqual(expectedAction);
  });

  it("should create an action to toggle the notifications on and off", () => {
    const expectedAction = {
      type: actions.TOGGLE_NOTIFICATION
    };
    expect(actions.toggleNotification()).toEqual(expectedAction);
  });

  it("should create an action to change the refreshing rate delay", () => {
    const expectedAction = {
      delay: 5,
      type: actions.CHANGE_DELAY
    };
    expect(actions.changeDelay(5)).toEqual(expectedAction);
  });
});
