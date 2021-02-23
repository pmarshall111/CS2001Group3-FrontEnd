import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
// import ListTodosComponent from "./ListToComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import EmailPage from "../email/EmailPage";

class App extends Component {
  render() {
    return (
      <div className="TodoApp">
        <Router>
          <>
            <HeaderComponent />
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <AuthenticatedRoute
                path="/welcome/:name"
                component={WelcomeComponent}
              />
              {/* <AuthenticatedRoute
                path="/todos"
                component={ListTodosComponent}
              /> */}

              <AuthenticatedRoute path="/emailpage" component={EmailPage} />

              <AuthenticatedRoute path="/logout" component={LogoutComponent} />
              <Route component={ErrorComponent} />
            </Switch>
            <FooterComponent />
          </>
        </Router>

        {/*<LoginComponent/>
                <WelcomeComponent/>*/}
      </div>
    );
  }
}

export default App;
