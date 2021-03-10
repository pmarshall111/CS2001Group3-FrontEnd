import React, { Component } from "react";
import "./App.css";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    // setting the state
    this.state = {
      username: "care",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false,
    };
  }
  // handling the onclick action
  handleChange = (event) => {
    //console.log(this.state)
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // handling the login clicked button
  loginClicked = () => {
    if (this.state.username === "care" && this.state.password === "password") {
      AuthenticationService.registerSuccessfulLogin(
        this.state.username,
        this.state.password
      );
      //console.log("Success!")
      // when login is correct, this is go to welcome page
      // read about react history api
      this.props.history.push(`/welcome/${this.state.username}`);
      //this.setState({showSuccessMessage : true})
      //this.setState({hasLoginFailed: false})
    } else {
      //console.log("Check credentials!")
      this.setState({ hasLoginFailed: true });
    }
  };

  // creating a input with defualt username set from the state and handline onchange
  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <div className="container">
          {/*<ShowInvalidCredentials hasLoginFailed = {this.state.hasLoginFailed}/> */}
          {/*<ShowLoginSuccessMessage showSuccessMessage = {this.state.showSuccessMessage}/> */}
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Credentials!</div>
          )}
          {this.state.showSuccessMessage && <div>Login Success!</div>}
          User Name
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-success" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
