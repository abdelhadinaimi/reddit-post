import { Action } from 'redux';
import {CLOSE_SETTINGS_MODAL,OPEN_SETTINGS_MODAL} from '../actions/utilActions';
import { IUtils } from '../types/interfaces';

const defaultState: IUtils= {
  settingsModalOpen: false
}

export default function utilReducer(state = defaultState,action: Action): IUtils{
  switch (action.type) {
    case OPEN_SETTINGS_MODAL:
      return Object.assign({}, state, {settingsModalOpen: true});
    case CLOSE_SETTINGS_MODAL:
      return Object.assign({}, state, {settingsModalOpen: false});
    default:
      return state;
  }
}
