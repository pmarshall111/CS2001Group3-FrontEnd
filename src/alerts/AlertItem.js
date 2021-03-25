import React from 'react';
import Button from "react-bootstrap/Button";

import "./AlertItem.css"
import {ExclamationDiamondFill} from "react-bootstrap-icons";

const AlertItem = (props) => {
    let colour = props.timeTillCycleEnd < 5 ? "#ffc7bf" : "#fff2bf"
    return (
        <div className={"alert-container"} style={{background: colour}}>
            <div className={"alert-details"}>
                <h5>Medication: </h5><h5>{props.medicationName}</h5>
                <h5>Resident: </h5><h5>{props.residentName}</h5>
                <h5>Pharmacy: </h5><h5>{props.pharmacyEmail}</h5>
            </div>
            <div className={"alert-time"}>
                    <h5>Runs out in {props.timeTillCycleEnd} day{props.timeTillCycleEnd == 1 ? "" : "s"}</h5>
            </div>
            <div className={"alert-btn-container"}>
                <Button onClick={() => props.sendEmail()}>Send email to Pharmacy</Button>
            </div>
        </div>
    );
}

export default AlertItem;