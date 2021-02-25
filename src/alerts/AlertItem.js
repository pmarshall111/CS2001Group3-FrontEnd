import React from 'react';
import Button from "react-bootstrap/Button";

import "./AlertItem.css"

const AlertItem = (props) => {
    return (
        <div className={"alert-container"}>
            <div className={"alert-details"}>
                <h3>{props.medicationName}</h3>
                <h4>{props.residentName}</h4>
            </div>
            <div className={"alert-time"}>
                <h4>{props.timeTillCycleEnd}</h4>
            </div>
            <div className={"alert-btn-container"}>
                <Button onClick={() => props.sendEmail()}>Send email to Pharmacy</Button>
            </div>
        </div>
    );
}

export default AlertItem;