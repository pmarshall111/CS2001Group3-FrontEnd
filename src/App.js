import React, { Component } from "react";
import {Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ViewAudit from "./medication/viewAudit/ViewAudit";
import AddMedication from "./medication/medication/AddMedication";
import AddAudit from "./medication/audit/AddAudit";
import View from "./medication/viewAudit/View";
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1 className="header">Medication Page</h1>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={'/audit'} className="nav-link">Add New Audit</Link>
              <Link to={'/addMedication'} className="nav-link">Add Medication</Link>
              <Link to={'/view'} className="nav-link">View Audits</Link>
          </nav>
          <Switch>

              <Route path='/addMedication' component={AddMedication} />
              <Route path='/audit' component={AddAudit} />
              <Route path='/view' component={View} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
