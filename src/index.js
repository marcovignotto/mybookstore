import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";

/**
 * @desc REDUX
 */

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import ReduxThunk from "redux-thunk";

import itemReducer from "./store/reducers/itemReducer";

const rootReducer = combineReducers({
  items: itemReducer,
});

/**
 * @desc disable redux devtools if cypress requires it
 */
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk),
    window.navigator.userAgent.includes("Chrome")
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
