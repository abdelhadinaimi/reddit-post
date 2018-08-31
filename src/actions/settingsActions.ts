import { Action } from "redux";
import { IDelayAction } from "../types/actions";

export const TOGGLE_SOUND = "TOGGLE_SOUND";
export const TOGGLE_NOTIFICATION = "TOGGLE_NOTIFICATION";
export const CHANGE_DELAY = "CHANGE_DELAY";
export const CALL_NOTIFICATION = "CALL_NOTIFICATION";

export function toggleSound(): Action {
  return {
    type: TOGGLE_SOUND
  };
}

export function toggleNotification(): Action {
  return {
    type: TOGGLE_NOTIFICATION
  };
}

export function changeDelay(delay: number): IDelayAction {
  return {
    delay,
    type: CHANGE_DELAY
  };
}
