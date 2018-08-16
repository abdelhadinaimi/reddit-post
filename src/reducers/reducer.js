import { combineReducers } from "redux";

import postsBySubreddit from "./redditReducer";
import settingsReducer from "./settingsReducer";
import errorMessage from "./errorReducer";
import utilReducer from "./utilReducer";

const reducer = combineReducers({
  errors: errorMessage,
  postsBySubreddit,
  settings: settingsReducer,
  utils: utilReducer
});

export default reducer;
