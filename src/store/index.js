import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/';

/*Created store and added thunk middleware to make API calls in action*/
export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(logger, thunk));
  return store;
}
