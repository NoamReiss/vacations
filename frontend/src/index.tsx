import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MainLayout from "./Components/Layout/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { travel } from "./Redux/TravelStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={travel}>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
