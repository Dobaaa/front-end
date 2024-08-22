import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./CSS/components/loading.css";
import "./CSS/components/form.css";
import "./CSS/components/button.css";
import "./CSS/components/Alerts.css";
import "./CSS/components/google.css";
import "./CSS/base/media.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./context/Menucontext";
import WindowContext from "./context/WindowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <Router>
          <App />
        </Router>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
