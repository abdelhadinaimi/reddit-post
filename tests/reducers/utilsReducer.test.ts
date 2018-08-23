import reducer from "../../src/reducers/utilReducer";

import * as actions from "../../src/actions/utilActions";

import { Action } from "redux";

describe("utils reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual({
      settingsModalOpen: false
    });
  });

  it("should handle OPEN_SETTINGS_MODAL", () => {
    const action = { type: actions.OPEN_SETTINGS_MODAL } as Action;
    expect(reducer({ settingsModalOpen: false }, action)).toEqual({
      settingsModalOpen: true,
    });
  });

  it("should handle OPEN_SETTINGS_MODAL", () => {
    const action = { type: actions.CLOSE_SETTINGS_MODAL } as Action;
    expect(reducer({ settingsModalOpen: true }, action)).toEqual({
      settingsModalOpen: false,
    });
  });
});
