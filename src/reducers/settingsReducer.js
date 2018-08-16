import {
  TOGGLE_SOUND,
  TOGGLE_NOTIFICATION,
  CHANGE_DELAY
} from "../actions/settingsActions";

const defaultState = {
  delay: 5,
  notification: false,
  sound: false
};

export default function settingsReducer(state = defaultState, action) {
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
