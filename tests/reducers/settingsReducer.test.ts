import reducer from "../../src/reducers/settingsReducer";

import * as actions from "../../src/actions/settingsActions";

const defaultState = {
  delay: 5,
  notification: false,
  sound: false
};

describe("setings reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(defaultState);
  });

  it("should handle TOGGLE_SOUND", () => {
    const action = { type: actions.TOGGLE_SOUND } as any;
    expect(reducer(defaultState, action)).toEqual({
      delay: 5,
      notification: false,
      sound: true
    });
    expect(reducer({ ...defaultState, ...{ sound: true } }, action)).toEqual({
      delay: 5,
      notification: false,
      sound: false
    });
  });

  it("should handle TOGGLE_NOTIFICATION", () => {
    const action = { type: actions.TOGGLE_NOTIFICATION } as any;
    expect(reducer(defaultState, action)).toEqual({
      delay: 5,
      notification: true,
      sound: false
    });
    expect(
      reducer({ ...defaultState, ...{ notification: true } }, action)
    ).toEqual({
      delay: 5,
      notification: false,
      sound: false
    });
  });

  it("should handle CHANGE_DELAY", () => {
    const action = { type: actions.CHANGE_DELAY, delay: 10 } as any;
    expect(reducer(defaultState, action)).toEqual({
      delay: 10,
      notification: false,
      sound: false
    });
  });
});
