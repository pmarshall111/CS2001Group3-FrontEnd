import React, {useState} from 'react';
import Button from "react-bootstrap/Button";

import {READY, ASKED_IF_READY, SENT_INITIAL_EMAIL, PROCESSING, INQUIRY, COMPLETE} from "./EmailStatusCategories";

import "./EmailPreview.css";
import {backendUrl} from "../config";
import {dateIsYesterdayOrEarlier} from "../helper/dateHelper";

const EmailPreview = (props) => {
    const {resident, status, medication, pharmacy, dateLastEmailSent, dateResponded, dateMedicationToBeReady, inquiryComment, nonGuessableId} = props;

    let backgroundColour;
    if (status === READY ) {
        backgroundColour = "green";
    } else if (status === ASKED_IF_READY) {
        backgroundColour = "paleturquoise";
    } else if (status === SENT_INITIAL_EMAIL) {
        backgroundColour = "lightyellow";
    } else if (status === PROCESSING) {
        backgroundColour = "cyan";
    } else if (status === INQUIRY) {
        backgroundColour = "red";
    } else if (status === COMPLETE) {
        backgroundColour = "grey";
    }

    const tryResendEmail = () => {
        fetch(`${backendUrl}/email/resend?id=${nonGuessableId}`)
            .then(r => r.json());
    }

    const markCollected = () => {
        fetch(`${backendUrl}/email/collected?id=${nonGuessableId}`)
            .then(r => r.json());
    }

    const undoMarkCollected = () => {
        fetch(`${backendUrl}/email/undo-collected?id=${nonGuessableId}`)
            .then(r => r.json());
    }

    const lastEmailSentDate = new Date(dateLastEmailSent).toUTCString();
    const pharmacyResponded = !dateResponded ? "-" : new Date(dateResponded).toUTCString();
    const readyDate = !dateMedicationToBeReady ? "-" : new Date(dateMedicationToBeReady).toDateString();
    const canResend = dateIsYesterdayOrEarlier(new Date(dateLastEmailSent));

    let buttons;
    if (status === COMPLETE) {
        buttons = <div className={"buttons-container"}><Button onClick={() => undoMarkCollected()} variant={"primary"}>Oops - not yet collected!</Button></div>
    } else if (status === READY) {
        buttons = <div className={"buttons-container"}><Button onClick={() => markCollected()} variant={"primary"}>I've collected this!</Button></div>
    } else {
        buttons = (
            <div className={"buttons-container"}>
                <Button onClick={() => props.showEmailContent()} variant="primary" block size={"lg"}>View Email</Button>
                <Button onClick={() => canResend ? tryResendEmail() : null} variant="secondary" block size={"lg"}
                        disabled={!canResend}>Resend</Button>
            </div>)
    }

    return (
        <div className={`email-container`} style={{"backgroundColor": backgroundColour}}>
            <div className={"email-status"}>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
            <div className={"email-data"}>
                <p>Resident: </p><p>{resident}</p>
                <p>Medication: </p><p>{medication}</p>
                <p>Pharmacy: </p><p>{pharmacy}</p>
                <p>Last email sent: </p><p>{lastEmailSentDate}</p>
                <p>Pharmacy Responded: </p><p>{pharmacyResponded}</p>
                <p>{status === INQUIRY ? "Inquiry comment: " : "Date ready: "}</p><p>{status === INQUIRY ? inquiryComment : readyDate}</p>
            </div>
            {buttons}
        </div>
    );
}

export default EmailPreview;
