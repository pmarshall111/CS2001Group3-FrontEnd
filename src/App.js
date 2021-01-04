import React, { Component } from "react";
import {Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Audit from "./medication/audit/Audit";
import ViewAudit from "./medication/viewAudit/ViewAudit";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1 className="header">Medication</h1>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={'/'} className="nav-link">Medication Audit </Link>
              <Link to={'/audit'} className="nav-link">Add Medication Audit</Link>
              <Link to={'/medication'} className="nav-link">Medication List</Link>
              <Link to={'/viewAudit'} className="nav-link">View Medication Audit</Link>
          </nav>
          <Switch>
              <Route path='/audit' component={Audit} />
              <Route path='/viewAudit' component={ViewAudit} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
