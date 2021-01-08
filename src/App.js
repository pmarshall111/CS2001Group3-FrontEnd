import React, { Component } from "react";
import {Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Audit from "./medication/audit/Audit";
import ViewAudit from "./medication/viewAudit/ViewAudit";
import AddMedication from "./medication/medicationLog/AddMedication";
import AddAudit from "./medication/audit/AddAudit";
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1 className="header">Medication Page</h1>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={'/audit'} className="nav-link">Add New Audit</Link>
              <Link to={'/addMedication'} className="nav-link">Add Medication Audit</Link>
              <Link to={'/viewAudit'} className="nav-link">View Medication Audit</Link>
          </nav>
          <Switch>
              <Route path='/viewAudit' component={ViewAudit} />
              <Route path='/addMedication' component={AddMedication} />
              <Route path='/audit' component={AddAudit} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
