import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./Store";
import { Provider } from "react-redux";
import { Chart, ArcElement } from "chart.js";
import { registerables } from "chart.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
Chart.register(...registerables);
Chart.register(ArcElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
