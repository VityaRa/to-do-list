import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.scss";

import { store } from "./store";
import { Provider } from "react-redux";
import { Loader } from "./components/common/loader";
import { initLanguages } from "./functions/initLanguages";

const App = lazy(() => import("./App"));

initLanguages()

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loader/>}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
