import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PharmacyPage from "./pharmacy/PharmacyPage";
import EmailPreview from "./email/EmailPreview";
import EmailPage from "./email/EmailPage";
import EmailConfirmation from "./email/EmailConfirmation";
import EmailInquiry from "./email/EmailInquiry";
import AlertsPage from "./alerts/AlertsPage";
import {backendUrl} from "./config";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {pharmacies:[], careHome:{careHomeName: "abc", id: 1}}
    }

    componentDidMount() {
        fetch(`${backendUrl}/pharmacy?careHomeId=${this.state.careHome.id}`)
            .then(response => response.text())
            .then(response => {
                console.log(JSON.parse(response))
                this.setState({pharmacies: JSON.parse(response)})
        })
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={EmailPage} />
                <Route path="/email/confirmation" component={EmailConfirmation} />
                <Route path="/email/inquiry" component={EmailInquiry} />
                <Route path="/pharmacy" render={(props) =>
                    <PharmacyPage {...props} pharmacies={this.state.pharmacies} careHomeId={this.state.careHome.id} />
                } />
                <Route path="/alerts" component={AlertsPage} />
            </Router>
        );
    }
}

export default App;
