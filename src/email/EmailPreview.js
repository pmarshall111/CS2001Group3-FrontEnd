import React from 'react';
import Button from "react-bootstrap/Button";

import {READY, ASKED_IF_READY, SENT_INITIAL_EMAIL, PROCESSING, INQUIRY} from "./EmailStatusCategories";

import "./EmailPreview.css";

const EmailPreview = (props) => {
    let backgroundColour;
    if (props.status === READY ) {
        backgroundColour = "green";
    } else if (props.status === ASKED_IF_READY) {
        backgroundColour = "paleturquoise";
    } else if (props.status === SENT_INITIAL_EMAIL) {
        backgroundColour = "lightyellow";
    } else if (props.status === PROCESSING) {
        backgroundColour = "cyan";
    } else if (props.status === INQUIRY) {
        backgroundColour = "red";
    }

    const buttons = props.status !== READY ? (<div className={"buttons-container"}> <Button variant="primary" block size={"lg"}>View Email</Button>
        <Button variant="secondary" block size={"lg"}>Resend</Button></div>) :
        <div className={"buttons-container"}><Button variant={"primary"}>Mark Complete!</Button></div>

    const lastEmailSentDate = new Date(props.dateLastEmailSent).toUTCString();
    const pharmacyResponded = !props.dateResponded ? "-" : new Date(props.dateResponded).toUTCString();
    const readyDate = !props.dateMedicationToBeReady ? "-" : new Date(props.dateMedicationToBeReady).toDateString();

    return (
        <div className={`email-container`} style={{"backgroundColor": backgroundColour}}>
            <div className={"email-status"}>{props.status.charAt(0).toUpperCase() + props.status.slice(1)}</div>
            <div className={"email-data"}>
                <p>Resident: </p><p>{props.resident}</p>
                <p>Medication: </p><p>{props.medication}</p>
                <p>Pharmacy: </p><p>{props.pharmacy}</p>
                <p>Last email sent: </p><p>{lastEmailSentDate}</p>
                <p>Pharmacy Responded: </p><p>{pharmacyResponded}</p>
                <p>{props.status === INQUIRY ? "Inquiry comment: " : "Date ready: "}</p><p>{props.status === INQUIRY ? props.inquiryComment : readyDate}</p>
            </div>
            {buttons}
        </div>
    );
}

export default EmailPreview;
