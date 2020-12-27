import React from 'react';
import TitleBar from "../shared/TitleBar";
import AlertItem from "./AlertItem";
import "./AlertsPage.css"
import Button from "react-bootstrap/Button";

class AlertsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {alerts: [
                {
                    "medicationName": "IbuProfen",
                    "residentName": "Irene Wilder",
                    "timeTillCycleEnd": "8 days",
                },
                {
                    "medicationName": "Paracetamol",
                    "residentName": "Gerald",
                    "timeTillCycleEnd": "3 days",
                }
            ]}
    }

    componentDidMount() {
        //to get data from DB
    }

    render() {
        const { alerts } = this.state;
        const alertItems = alerts.map((a,idx) =>
            <AlertItem
                medicationName={a.medicationName}
                residentName={a.residentName}
                timeTillCycleEnd={a.timeTillCycleEnd}
                key={`alerts-${idx}`}
            />
        )

        return (
            <div>
                <TitleBar title={"Alerts"}>
                    <Button>Send emails for all alerts</Button>
                </TitleBar>
                <div className={"list"}>
                    {alertItems}
                </div>
            </div>
        );
    }
}

export default AlertsPage;