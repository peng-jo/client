import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducers from "./store";
import { Provider } from "react-redux";
import { createStore } from "redux";
const devTool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducers, devTool);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
