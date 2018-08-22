import {RESET_ERROR_MESSAGE} from '../actions/errorActions';
import { IErrorAction } from '../types/actions';

export default function errorMessage(state : null | string = null, action : IErrorAction) {
  const { type, error } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }
  return state;
}
