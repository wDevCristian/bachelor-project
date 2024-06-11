import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import UserStore from "./store/UserStore.js";
import MenuItemActiveStore from "./store/MenuItemActiveStore.js";

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        menuItemActive: new MenuItemActiveStore(),
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>
);
