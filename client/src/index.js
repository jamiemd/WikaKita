import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import reducers from "./Reducers";
import { loadState, saveState } from "./localStorage";

import "./index.css";
import App from "./App";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
console.log("createStoreWithMiddleware", createStoreWithMiddleware);

console.log(
  "createStoreWithMiddleware(reducers)",
  createStoreWithMiddleware(reducers)
);

const store = createStoreWithMiddleware(reducers);

store.subscribe(() => {
  saveState({
    flashcards: store.getState().flashcards
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
