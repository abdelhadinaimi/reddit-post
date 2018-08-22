import * as actions from "../../src/actions/utilActions";

describe("actions", () => {
  it("should create an action to close the settings modals", () => {
    const expectedAction = {
      type: actions.CLOSE_SETTINGS_MODAL
    };
    expect(actions.closeSettingsModal()).toEqual(expectedAction);
  });

  it("should create an action to open the settings modals", () => {
    const expectedAction = {
      type: actions.OPEN_SETTINGS_MODAL
    };
    expect(actions.openSettingsModal()).toEqual(expectedAction);
  });
});