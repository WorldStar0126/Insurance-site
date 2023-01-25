import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
/*
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import persistData from 'redux-localstorage'

// Reducers
import rootReducer from './reducers';

// const rootReducer = combineReducers({
//   note: noteReducer,
// })

const composeEnhancers = composeWithDevTools(
  applyMiddleware(thunk),
  persistData('note')
)
const store = createStore( rootReducer, composeEnhancers)
export default store;*/