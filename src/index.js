import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./todos/app";
import "./index.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  HashRouter,
  Routes,
  Navigate,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
