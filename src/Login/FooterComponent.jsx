import React, { Component } from "react";
import "./App.css";

class FooterComponent extends Component {
  render() {
    const n = new Date().getFullYear();
    return (
      <div>
        <footer
          style={{ marginTop: "20px", position: "fixed", left: 0, bottom: 0 }}
          className="footer"
        >
          <span className="text-muted">All Rights Reserved {n} Group3</span>
        </footer>
      </div>
    );
  }
}

export default FooterComponent;
