﻿import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css"; // fontos!
import App from "./App";
import { UserProvider } from "./context/UserContext";



ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <App />
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);
