import { combineReducers } from "redux";

import errorMessage from "./errorReducer";
import postsBySubreddit from "./redditReducer";
import settingsReducer from "./settingsReducer";
import utilReducer from "./utilReducer";

const reducer = combineReducers({
  errors: errorMessage,
  postsBySubreddit,
  settings: settingsReducer,
  utils: utilReducer
});

export default reducer;
