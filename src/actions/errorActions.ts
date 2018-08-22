import { Action } from "redux";

export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";


export function resetErrorMessage(): Action {
  return {
    type: RESET_ERROR_MESSAGE
  };
}

