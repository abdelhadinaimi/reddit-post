import { combineReducers } from "redux";

import postsBySubreddit from "./redditReducer";
import settingsReducer from "./settingsReducer";
import errorMessage from "./errorReducer";
import utilReducer from "./utilReducer";

const reducer = combineReducers({
  postsBySubreddit,
  settings: settingsReducer,
  errors: errorMessage,
  utils: utilReducer
});

export default reducer;
