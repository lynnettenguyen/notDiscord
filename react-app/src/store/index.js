import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import servers from './servers';
import server from './server';
import users from './users';
import userSorted from './userSorted'
import channelMessages from './channelMessages'
import directChat from './directChat'
import directMessages from './directMessages'
import channels from './channels'

const rootReducer = combineReducers({
  session,
  users,
  userSorted,
  servers,
  server,
  channels,
  channelMessages,
  directChat,
  directMessages
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
