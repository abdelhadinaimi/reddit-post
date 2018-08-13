import postsBySubreddit from './redditReducer';
import settingsReducer from './settingsReducer';
import errorMessage from './errorReducer';
import utilReducer from './utilReducer';
import { combineReducers } from 'redux';
const reducer = combineReducers({
  postsBySubreddit,
  settings : settingsReducer,
  errors : errorMessage,
  utils : utilReducer
})

export default reducer;
