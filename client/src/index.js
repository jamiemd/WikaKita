import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import reducers from "./Reducers";

import "./index.css";
import App from "./App";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
