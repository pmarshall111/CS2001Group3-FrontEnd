import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PharmacyPage from "./pharmacy/PharmacyPage";
import EmailPage from "./email/EmailPage";
import EmailSetDate from "./email/EmailSetDate";
import EmailInquiry from "./email/EmailInquiry";
import AlertsPage from "./alerts/AlertsPage";
import {backendUrl} from "./config";
import EmailReadyForCollection from "./email/EmailReadyForCollection";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pharmacies:[],
            careHome:{name: "abc", id: 1, email:"abc@aol.com"},
            careHomeWorker:"Peter"}
    }

    componentDidMount() {
        fetch(`${backendUrl}/pharmacy?careHomeId=${this.state.careHome.id}`)
            .then(response => response.text())
            .then(response => {
                console.log({pharmacies: JSON.parse(response)})
                this.setState({pharmacies: JSON.parse(response)})
        })
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={EmailPage} />
                <Route path="/email/set-date" component={EmailSetDate} />
                <Route path="/email/inquiry" component={EmailInquiry} />
                <Route path="/email/ready-to-collect" component={EmailReadyForCollection} />
                <Route path="/pharmacy" render={(props) =>
                    <PharmacyPage {...props} pharmacies={this.state.pharmacies} careHomeId={this.state.careHome.id} />
                } />
                <Route path="/alerts" render={(props) =>
                    <AlertsPage {...props}
                                careHomeName={this.state.careHome.name}
                                careHomeWorker={this.state.careHomeWorker}
                                careHomeEmail={this.state.careHome.email}
                                careHomeId={this.state.careHome.id}
                    />
                } />
            </Router>
        );
    }
}

export default App;
