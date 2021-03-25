import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {backendUrl} from "../config";
import FullPageCentered from "../shared/FullPageCentered";
import List from "../shared/List";
import Quote from "../shared/Quote";

const EmailInquiry = (props) => {
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
        fetch(`${backendUrl}/email/reject`, {method: "POST", body: JSON.stringify({comment,requestId}), headers: {"Content-Type": "application/json"}})
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
            <FullPageCentered background={"#f6d6ad"} >
                <h2>Inquiry needed</h2>
                <List items={inquiryDetails}>
                    <p>Inquiry comment</p>
                    <textarea rows={4} onChange={e => setComment(e.target.value)} value={comment} />
                </List>
                <Button variant="primary" onClick={e => submit(e)}>
                    Let the care home know!
                </Button>
            </FullPageCentered>
        );
    } else {
        return (
            <FullPageCentered>
                <h4>Inquiry submitted to the care home with the comment:</h4>
                <Quote quote={comment} />
            </FullPageCentered>
        )
    }
}

export default EmailInquiry;
