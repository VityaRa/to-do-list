//@ts-nocheck

import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.scss";

import { store } from "./store";
import { Provider } from "react-redux";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<h2 style={{ color: "#000" }}>WAIT</h2>}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
