import { createStore, applyMiddleware} from 'redux';
import reducer from './reducers/reducer';
import {fetchPostsIfNeeded} from './actions/redditActions';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

store.dispatch(fetchPostsIfNeeded('all'));



export default store;
