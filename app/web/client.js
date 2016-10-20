import React from "react";
import ReactDOM from "react-dom";
import mainPage from "./Components/mainPage";
import { Router, Route, hashHistory } from 'react-router';




ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={mainPage} />
  </Router>
  , document.getElementById('app'));