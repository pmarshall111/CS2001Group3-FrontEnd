import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import FullPageCentered from "../shared/FullPageCentered";
import List from "../shared/List";
import {backendUrl} from "../config";
import {convertToYYYYMMDD} from "../helper/convertTimestampToDate";

const EmailSetDate = (props) => {
    const [readyDate, setReadyDate] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [careHomeName, setCareHomeName] = useState("-");
    const [residentName, setResidentName] = useState("-");
    const [medication, setMedication] = useState("-");
    const requestId = props.location.search.substring(1); //using substring as otherwise it includes the ? at the beginning

    //method to get the details of the medication from the database once the page loads
    useEffect(() => {
        fetch(`${backendUrl}/email/details?id=${requestId}`)
            .then(r => r.json())
            .then(resp => {
                console.log(resp);
                setCareHomeName(resp.careHomeName || "-");
                setResidentName(resp.residentName || "-");
                setMedication(resp.medicationName || "-");
                if (resp.dateMedicationToBeReady) { //if date is not set don't change default value
                    setReadyDate(convertToYYYYMMDD(resp.dateMedicationToBeReady));
                }
            })
    }, []); //adding empty array here to ensure that useEffect only fires once. the func tests whether it should fire by testing whether this arg has changed


    const submit = e => {
        e.preventDefault();
        console.log({readyDate, requestId});
        fetch(`${backendUrl}/email/accept`, {
            method: "POST",
            body: JSON.stringify({readyDate, requestId}),
            headers: {"Content-Type": "application/json"}
        })
            .then(response => response.json())
            .then(r => {
                console.log(r);
                setIsSubmitted(true);
            })
            .catch(e => console.log(e));
    }

    //getting todays date so we can set the earliest date the medication is ready to today - i.e. the pharmacist cannot pick a past date
    let now = new Date();
    let today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

    let inquiryDetails = {
        "Care Home": careHomeName, Resident: residentName, Medication: medication
    }

    if (!isSubmitted) {
        return (
            <FullPageCentered background={"#ccf6c8"}>
                <h2>My Pharmacy can accept the Medication request!</h2>
                <List items={inquiryDetails}>
                    <p>Date ready for collection:</p>
                    <input type={"date"} min={today} onChange={e => setReadyDate(e.target.value)} value={readyDate}/>
                </List>
                <Button variant="primary" onClick={e => submit(e)} style={{width: "auto !important", padding: "10px 20px"}}>
                    Confirm and let the care home know!
                </Button>
            </FullPageCentered>
        );
    } else {
        return (
            <FullPageCentered>
                <h4>Confirmation sent to the care home that they can pick up the medication on:</h4>
                <h4>{readyDate}</h4>
            </FullPageCentered>
        )
    }
}

export default EmailSetDate;
