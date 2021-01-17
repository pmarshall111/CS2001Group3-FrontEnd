import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {backendUrl} from "../config";
import FullPageCentered from "../shared/FullPageCentered";
import List from "../shared/List";
import Quote from "../shared/Quote";

const EmailReadyForCollection = (props) => {
    const [comment, setComment] = useState("");
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
                setComment(resp.pharmacyComment || "");
            })
    }, []); //adding empty array here to ensure that useEffect only fires once. the func tests whether it should fire by testing whether this arg has changed

    const submit = e => {
        e.preventDefault();
        fetch(`${backendUrl}/email/ready-for-collection`, {method: "POST", body: JSON.stringify({comment,requestId}), headers: {"Content-Type": "application/json"}})
            .then(response => response.json())
            .then(r => {
                console.log(r)
                setIsSubmitted(true);
            })
            .catch(e => console.log(e));
    }

    let inquiryDetails = {
        "Care Home": careHomeName,
        Resident: residentName,
        Medication: medication
    }

    if (!isSubmitted) {
        return (
            <FullPageCentered background={"#DCFFFB"} >
                <h2>Medication is ready to Collect!</h2>
                <List items={inquiryDetails} />
                <Button variant="primary" onClick={e => submit(e)}>
                    The care home can collect the medication!
                </Button>
            </FullPageCentered>
        );
    } else {
        return (
            <FullPageCentered>
                <h3>{careHomeName} will be notified that {medication} is ready to collect!</h3>
            </FullPageCentered>
        )
    }
}

export default EmailReadyForCollection;
