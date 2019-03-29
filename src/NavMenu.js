import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";
import Form from "./Form";

function NavMenu() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/add" component={Form} />
        <Route path="/edit/:id" component={Form} />
      </div>
    </Router>
  );
}
export default NavMenu;