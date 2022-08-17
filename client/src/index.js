import React from "react";
import reactDOM from "react-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";

reactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
