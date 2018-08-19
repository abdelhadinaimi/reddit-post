import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

import { addSubreddit } from "./actions/listActions";
// import { fetchPostsIfNeeded } from "./actions/redditActions";

import reducer from "./reducers/reducer";

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

// Initilizing the app with the r/all subreddit
// TODO Store the subreddits in memory for next time the users launches the app
store.dispatch(addSubreddit("all"));
// store.dispatch(fetchPostsIfNeeded("all"));

export default store;
