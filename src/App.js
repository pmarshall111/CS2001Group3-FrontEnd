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
import Timeline from "./shared/Timeline";
import ParentTooltip from "./shared/tooltip/ParentTooltip";

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
        const practiceTimelineData = [
            {medicationName: "Paracetamol", dose: 2, time: new Date(new Date().setHours(9)), resident: "Jimmy"},
            {medicationName: "Paracetamol", dose: 2, time: new Date(new Date().setHours(13)), resident: "Jimmy"},
            {medicationName: "Deep heat", dose: 1, time: new Date(new Date().setHours(9)), resident: "Jimmy"},
            {medicationName: "Ibuprofen", dose: 1, time:new Date(new Date().setHours(9)), resident: "Tom"},
            {medicationName: "Ibuprofen", dose: 2, time: new Date(new Date().setHours(20)), resident: "Tom"},
            {medicationName: "Tylenol", dose: 2, time: new Date(new Date().setHours(9)), resident: "Rebecca"},
            {medicationName: "Tylenol", dose: 2, time: new Date(new Date().setHours(13)), resident: "Rebecca" },
            {medicationName: "Tylenol", dose: 2, time: new Date(new Date().setHours(16)), resident: "Rebecca" },
            {medicationName: "Tylenol", dose: 2, time: new Date(new Date().setHours(20)), resident: "Rebecca"}
        ]

        // const medicationsAtTime = [
        //     {medicationName: "Paracetamol", dose: 2, time: new Date(new Date().setHours(9)), resident: "Jimmy"},
        //     {medicationName: "Deep heat", dose: 1, time: new Date(new Date().setHours(9)), resident: "Jimmy"},
        //     {medicationName: "Tylenol", dose: 2, time: new Date(new Date().setHours(9)), resident: "Rebecca"},
        //     {medicationName: "Ibuprofen", dose: 1, time:new Date(new Date().setHours(9)), resident: "Tom"}
        // ]

        const medicationsAtTime = [
            {medicationName: "Tylenol", dose: "15ml", time: new Date(new Date().setHours(9)), resident: "Rebecca"},
            {medicationName: "Ibuprofen", dose: 2, time: new Date(new Date().setHours(9)), resident: "Rebecca" },
            {medicationName: "Paracetamol", dose: 2, time: new Date(new Date().setHours(9)), resident: "Rebecca" },
            {medicationName: "Deep Heat", dose: 1, time: new Date(new Date().setHours(9)), resident: "Rebecca"}
        ]

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
                <Route path="/timeline" render={(props) =>
                    <div>
                        <Timeline dosages={practiceTimelineData} />
                    </div>
                } />
            </Router>
        );
    }
}

export default App;
