import React from 'react';
import TitleBar from "../shared/TitleBar";
import AlertItem from "./AlertItem";
import "./AlertsPage.css"
import Button from "react-bootstrap/Button";
import {backendUrl} from "../config";
import Form from "react-bootstrap/Form";
import {convertToYYYYMMDD} from "../helper/convertTimestampToDate";
import {dateDiff} from "../helper/dateHelper";


//alerts will be for any medication that hasn't had an email request sent off yet.
class AlertsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            usesAutomaticEmails: false,
            intervalId: -1
        }
    }

    sendEmailForAllAlerts() {
        this.state.alerts.forEach(alert => {
            this.sendEmail(alert.medicationName, alert.residentName, alert.cycleEndDate, alert.pharmacyEmail);
        })
    }

    sendEmail(alertId) {
        const backendData = {alertId}
        fetch(`${backendUrl}/email`,
            {method: "POST", body: JSON.stringify(backendData), headers: {"Content-Type": "application/json"}})
            .then(() => this.getAlertsFromDb());
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
            .then(r => {
                this.setState({usesAutomaticEmails: r.usesAutomaticEmails})
            })
        this.getAlertsFromDb();
        this.setState({intervalId: setInterval(() => this.getAlertsFromDb(), 60000)}) //check every minute
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    getAlertsFromDb() {
        fetch(`${backendUrl}/alerts?careHomeId=${this.props.careHomeId}`)
            .then(resp => resp.json())
            .then(r => {
                console.log({r})
                this.setState({alerts: r})
            })
    }


    render() {
        const { alerts } = this.state;

        const alertItems = alerts.map((a,idx) =>
            <AlertItem
                medicationName={a.medicationName}
                residentName={a.residentName}
                timeTillCycleEnd={dateDiff(new Date(), a.cycleEndDate)}
                pharmacyEmail={a.pharmacyEmail}
                key={`alerts-${idx}`}
                sendEmail={() => this.sendEmail(a.alertId)}
            />
        )

        return (
            <main>
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
            </main>
        );
    }
}

export default AlertsPage;