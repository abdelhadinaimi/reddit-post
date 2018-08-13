import {OPEN_SETTINGS_MODAL,CLOSE_SETTINGS_MODAL} from '../actions/utilActions';

const defaultState = {
  settingsModalOpen : false
}

export default function utilReducer(state = defaultState,action){
  switch (action.type) {
    case OPEN_SETTINGS_MODAL:
      return Object.assign({}, state, {settingsModalOpen: true});
    case CLOSE_SETTINGS_MODAL:
      return Object.assign({}, state, {settingsModalOpen: false});
    default:
      return state;
  }
}
