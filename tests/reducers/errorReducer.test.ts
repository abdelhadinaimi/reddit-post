import reducer from "../../src/reducers/errorReducer";

import * as actions from "../../src/actions/errorActions";
import { IErrorAction } from "../../src/types/actions";

describe("error reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as IErrorAction)).toEqual(null);
  });

  it("should handle RESET_ERROR_MESSAGE", () => {
    const action = { type: actions.RESET_ERROR_MESSAGE } as IErrorAction;
    expect(reducer("There is an error", action)).toEqual(null);
  });

  it("should handle any other error action", () => {
    const error = "This is an error";
    const action = {
      error,
      type: "ANY_ERROR_MESSAGE"
    } as IErrorAction;
    expect(reducer("There is an error", action)).toEqual(error);
    expect(reducer(undefined,action)).toEqual(error);
  });
});
