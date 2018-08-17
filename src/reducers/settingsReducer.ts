import {
  CHANGE_DELAY,
  TOGGLE_NOTIFICATION,
  TOGGLE_SOUND
} from "../actions/settingsActions";
import { IDelayAction, INotificationAction } from "../types/actions";
import { ISettings } from "../types/interfaces";

type settingsAction = IDelayAction & INotificationAction;

const defaultState: ISettings= {
  delay: 5,
  notification: false,
  sound: false
};

export default function settingsReducer(state = defaultState, action: settingsAction): ISettings{
  switch (action.type) {
    case TOGGLE_SOUND:
      return Object.assign({}, state, { sound: !state.sound });
    case TOGGLE_NOTIFICATION:
      return Object.assign({}, state, { notification: !state.notification });
    case CHANGE_DELAY:
      return Object.assign({}, state, { delay: action.delay });
    default:
      return state;
  }
}
