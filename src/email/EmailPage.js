import React from 'react';

import TitleBar from "../shared/TitleBar";
import Form from "react-bootstrap/Form";

import "./EmailPage.css";

import {backendUrl} from "../config";
import EmailPreview from "./EmailPreview";

import {READY, ASKED_IF_READY, SENT_INITIAL_EMAIL, PROCESSING, INQUIRY, COMPLETE} from "./EmailStatusCategories";
import ShowEmailContent from "./ShowEmailContent";


class EmailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {emailType:"All", emails: [], emailHtml: "", showEmailHtml: ""};
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb() {
        fetch(`${backendUrl}/email?careHomeId=1`)
            .then(response => response.text())
            .then(response => {
                console.log(JSON.parse(response))
                this.setState({emails: JSON.parse(response)})
            })
    }

    showEmailContent(nonGuessableId) {
        fetch(`${backendUrl}/email/show-email-content?id=${nonGuessableId}`)
            .then(response => response.text())
            .then(response => {
                this.setState({emailHtml: JSON.parse(response).emailHtml, showEmailHtml: true})
            })
    }

    hideEmailContent() {
        this.setState({showEmailHtml: false, emailHtml: ""})
    }

    render() {
        let {emails, emailType} = this.state;
        // emails = [
        //     {residentName: "Gerald Hornet", medicationName:"Paracetamol 20 tablets 25g", pharmacyName:"Croyden corner", dateSent:"02-12-20 12:34", dateResponded: null, status:"unresponded"},
        //     {residentName: "Mary Whippersville", medicationName:"IbuProfen 20 tablets 25g", pharmacyName:"Croyden corner", dateSent:"02-12-20 12:34", dateResponded: null, status:"accepted"},
        //     {residentName: "Guy from trainspotting", medicationName:"1kg heroin", pharmacyName:"Croyden corner", dateSent:"02-12-20 12:34", dateResponded: null, status:"rejected"}
        // ]
        console.log(emails)
        let emailPreviews = emails.filter(x => emailType == "All" || x.status == emailType)
            .map((email,idx) =>
            <EmailPreview resident={email.residentName} medication={email.medicationName} pharmacy={email.pharmacyEmail} dateLastEmailSent={email.dateLastEmailSent}
                          dateResponded={email.dateUpdatedByPharmacy} dateMedicationToBeReady={email.dateMedicationToBeReady} inquiryComment={email.pharmacyComment}
                          status={email.status} nonGuessableId={email.nonGuessableId} showEmailContent={() => this.showEmailContent(email.nonGuessableId)} key={idx} />
        );

        return (
            <main>
                <TitleBar title={"Emails Sent"}>
                    <Form.Control as={"select"} custom onChange={(e) => {
                        console.log(e)
                        console.log(e.target.value.toLowerCase())
                        this.setState({emailType: e.target.value})}
                    } >
                        <option>All</option>
                        <option>{SENT_INITIAL_EMAIL}</option>
                        <option>{PROCESSING}</option>
                        <option>{INQUIRY}</option>
                        <option>{ASKED_IF_READY}</option>
                        <option>{READY}</option>
                        <option>{COMPLETE}</option>
                    </Form.Control>
                </TitleBar>
                <div className={"list"}>
                    {emailPreviews}
                </div>
                <ShowEmailContent show={this.state.showEmailHtml} close={() => this.hideEmailContent()} emailHtml={this.state.emailHtml}/>
            </main>
        );
    }
}

export default EmailPage;
