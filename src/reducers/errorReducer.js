import {RESET_ERROR_MESSAGE} from '../actions/errorActions';

export default function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}
