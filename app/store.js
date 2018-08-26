import { createStore, combineReducers, applyMiddleware } from 'redux';

import promise from 'redux-promise-middleware';

import homeReducer from './reducers/Home/homeReducer';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(
    promise(),
    thunk,
    createLogger()
);

export default createStore(
    combineReducers({        
        homeReducer,
  	}),
    {},
    middleware
);
