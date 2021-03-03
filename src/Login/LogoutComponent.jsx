import React, { Component } from "react";
import "./App.css";

class LogoutComponent extends Component {
  render() {
    return (
      <div className="logout-text">
        <h1>You are successfully logged out!</h1>
        <div className="container">Thank you for using our application.</div>
      </div>
    );
  }
}

export default LogoutComponent;
