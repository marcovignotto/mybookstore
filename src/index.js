import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./App";

import "./index.css";

import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";

import { composeWithDevTools, actionCreators } from "redux-devtools-extension";

import itemReducer from "./store/reducers/itemReducer";

const rootReducer = combineReducers({
  items: itemReducer,
});

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
  // applyMiddleware(ReduxThunk)
);

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(ReduxThunk))
// );

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);