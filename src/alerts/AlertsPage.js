import React from 'react';
import TitleBar from "../shared/TitleBar";
import AlertItem from "./AlertItem";
import "./AlertsPage.css"
import Button from "react-bootstrap/Button";
import {backendUrl} from "../config";
import Form from "react-bootstrap/Form";


//alerts will be for any medication that hasn't had an email request sent off yet.
class AlertsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [{
                    "medicationName": "IbuProfen",
                    "residentName": "Irene Wilder",
                    "cycleEndDate": "12-05-20",
                    "pharmacyEmail": "farmacie@hotmail.com"
                },
                {
                    "medicationName": "Paracetamol",
                    "residentName": "Gerald",
                    "cycleEndDate": "15-09-23",
                    "pharmacyEmail": "pharmacy@aol.com"
                }],
            usesAutomaticEmails: false
        }
    }

    sendEmailForAllAlerts() {
        this.state.alerts.forEach(alert => {
            this.sendEmail(alert.medicationName, alert.residentName, alert.cycleEndDate, alert.pharmacyEmail);
        })
    }

    sendEmail(medicationName, residentName, cycleEndDate, pharmacyEmail) {
        const {careHomeName, careHomeWorker, careHomeEmail} = this.props;
        const backendData = {medicationName, residentName, cycleEndDate, pharmacyEmail, careHomeName, careWorkerName: careHomeWorker, careHomeEmail}
        fetch(`${backendUrl}/email`,
            {method: "POST", body: JSON.stringify(backendData), headers: {"Content-Type": "application/json"}});
    }

    updateUsesAutomaticEmails() {
        this.setState({usesAutomaticEmails: !this.state.usesAutomaticEmails}) //change state at the beginning so that change looks instant to end user - doesn't need to wait for backend response
        const data = {careHomeId: this.props.careHomeId, usesAutomaticEmails: !this.state.usesAutomaticEmails};
        fetch(`${backendUrl}/auto-email`, {method: "PUT", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}})
            .then(resp => resp.json())
            .then(resp => this.setState({usesAutomaticEmails: resp.usesAutomaticEmails}))
            .catch(e => console.log(e))
    }

    componentDidMount() {
        //to get data from DB
        fetch(`${backendUrl}/auto-email?careHomeId=${this.props.careHomeId}`)
            .then(resp => resp.json())
            .then(r => this.setState({usesAutomaticEmails: r.usesAutomaticEmails}))
    }

    render() {
        const { alerts } = this.state;
        const alertItems = alerts.map((a,idx) =>
            <AlertItem
                medicationName={a.medicationName}
                residentName={a.residentName}
                timeTillCycleEnd={a.cycleEndDate}
                key={`alerts-${idx}`}
                sendEmail={() => this.sendEmail(a.medicationName, a.residentName, a.cycleEndDate, a.pharmacyEmail)}
            />
        )

        return (
            <div>
                <TitleBar title={"Alerts"}>
                    <Form.Check type={"switch"}
                                id={"auto-email-switch"}
                                label={"Send emails automatically when a medication has stock lower than 2 weeks left"}
                                checked={this.state.usesAutomaticEmails || false} //OR false here for if the request to DB returns NULL or errors
                                onChange={() => this.updateUsesAutomaticEmails()}
                    />
                    <Button onClick={() => this.sendEmailForAllAlerts()}>Send emails for all alerts</Button>
                </TitleBar>
                <div className={"list"}>
                    {alertItems}
                </div>
            </div>
        );
    }
}

export default AlertsPage;