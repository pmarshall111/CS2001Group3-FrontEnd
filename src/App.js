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
import MedicationForm from "./medication/MedicationForm";
import Timeline from "./shared/Timeline";
import ParentTooltip from "./shared/tooltip/ParentTooltip";

import Medication_TEMP from "./medication/Medication_TEMP";
import FileUploadBtn from "./shared/FileUploadBtn";

import ResidentsList from './profile/resident/ResidentsList';
import CareWorkerList from './profile/careworker/CareWorkerList';
import Dashboard from "./Dashboard/Dashboard";
import Residentprofile from "./profile/resident/Residentprofile";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pharmacies:[],
            careHome:{name: "abc", id: 0, email:"abc@aol.com"},
            careHomeWorker:"Peter",
            medicationDoses: []
        }
    }

    componentDidMount() {
        this.getPharmacies(this.state.careHome.id)

        // fetch(`${backendUrl}/medication/schedule/?residentId=1`)
        //     .then(r => r.json())
        //     .then(r => {
        //         console.log(r)
        //         const dosages = r.map(x => {
        //             return {...x, time: new Date(x.time), resident: x.residentName.split(" ")[0], dose: x.dose, medicationName:x.medicationName}
        //         })
        //         this.setState({medicationDoses: dosages})
        //     })

        fetch(`${backendUrl}/medication/schedule/all/?careHomeId=0`)
            .then(r => r.json())
            .then(r => {
                console.log(r)
                const dosages = r.map(x => {
                    return {...x, time: new Date(x.time), resident: x.residentName.split(" ")[0], dose: x.dose, medicationName:x.medicationName}
                })
                this.setState({medicationDoses: dosages})
            })

    }

    getPharmacies(careHomeId) {
        fetch(`${backendUrl}/pharmacy?careHomeId=${careHomeId}`)
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
                <Route exact path="/" render={(props) => <Dashboard />} />
                <Route exact path="/file-upload" render={(props) => <FileUploadBtn isResident={true} id={1} />} />
                <Route exact path="/email" component={EmailPage} />
                <Route path="/resident" render={ ()=> <ResidentsList careHomeId={this.state.careHome.id} /> } />
                <Route path="/careWorker" render={ ()=> <CareWorkerList careHomeId={this.state.careHome.id} /> } />
                <Route path="/medication-temp" render={(props) => <Medication_TEMP pharmacies={this.state.pharmacies} />} />
                <Route path="/email/set-date" component={EmailSetDate} />
                <Route path="/email/inquiry" component={EmailInquiry} />
                <Route path="/email/ready-to-collect" component={EmailReadyForCollection} />
                <Route path="/pharmacy" render={(props) =>
                    <PharmacyPage {...props} pharmacies={this.state.pharmacies} careHomeId={this.state.careHome.id}
                                  pharmaciesHaveChanged={() => this.getPharmacies(this.state.careHome.id)} />
                } />
                <Route path="/alerts" render={(props) =>
                    <AlertsPage {...props}
                                careHomeName={this.state.careHome.name}
                                careHomeWorker={this.state.careHomeWorker}
                                careHomeEmail={this.state.careHome.email}
                                careHomeId={this.state.careHome.id}
                    />
                } />
                <Route path="/medication-form" render={(props) => <MedicationForm {...props} resId={0} pharmacies={this.state.pharmacies} />} />
                <Route path="/timeline" render={(props) =>
                    <div>
                        <Timeline dosages={this.state.medicationDoses} />
                    </div>
                } />
            </Router>
        );
    }
}

export default App;
