import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { fetchPostsIfNeeded } from "./actions/redditActions";
import reducer from "./reducers/reducer";

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

//Initilizing the app with the r/all subreddit
store.dispatch(fetchPostsIfNeeded("all"));

export default store;
