import React from 'react';
import Button from "react-bootstrap/Button";

import "./EmailPreview.css";

const EmailPreview = (props) => {
    let backgroundColour;
    if (props.status == "accepted") {
        backgroundColour = "green";
    } else if (props.status == "unresponded") {
        backgroundColour = "yellow";
    } else if (props.status == "rejected") {
        backgroundColour = "red";
    }
    return (
        <div className={`email-container`} style={{"backgroundColor": backgroundColour}}>
            <div className={"email-status"}>{props.status.charAt(0).toUpperCase() + props.status.slice(1)}</div>
            <div className={"email-data"}>
                <p>Resident: </p><p>{props.resident}</p>
                <p>Medication: </p><p>{props.medication}</p>
                <p>Pharmacy: </p><p>{props.pharmacy}</p>
                <p>Date requested: </p><p>{props.dateSent}</p>
                <p>Date responded: </p><p>{props.dateResponded || "-"}</p>
            </div>
            <Button variant="primary" block size={"lg"}>View Email</Button>
            <Button variant="secondary" block size={"lg"}>Resend</Button>
        </div>
    );
}

export default EmailPreview;
