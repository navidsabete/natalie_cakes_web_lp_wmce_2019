import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";
import Form from "./Form";
import logo from './Logo.png';
import './App.css';

function NavMenu() {
  return (
    <Router>
      <header className="App-header">
            <div>
              <img src={logo} className="App-logo" alt="logo"/>
            </div>
          </header>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/add" component={Form} />
        <Route path="/edit/:id" component={Form} />
      </div>
    </Router>
  );
}
export default NavMenu;