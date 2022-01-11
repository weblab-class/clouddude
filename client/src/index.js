import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// renders React Component "Root" into the DOM element with ID "root"
// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App />, document.getElementById("root"));

// allows for live updating
module.hot.accept();
