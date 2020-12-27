import React from 'react';

import TitleBar from "../shared/TitleBar";
import Form from "react-bootstrap/Form";

import "./EmailPage.css";

import {backendUrl} from "../config";
import EmailPreview from "./EmailPreview";

class EmailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {emailType:"all", emails: []};
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb() {
        fetch(`http://${backendUrl}/email?careHomeName=abc`)
            .then(response => response.text())
            .then(response => {
                console.log(JSON.parse(response))
                this.setState({emails: JSON.parse(response)})
            })
    }

    render() {
        let {emails, emailType} = this.state;
        // emails = [
        //     {residentName: "Gerald Hornet", medicationName:"Paracetamol 20 tablets 25g", pharmacyName:"Croyden corner", dateSent:"02-12-20 12:34", dateResponded: null, status:"unresponded"},
        //     {residentName: "Mary Whippersville", medicationName:"IbuProfen 20 tablets 25g", pharmacyName:"Croyden corner", dateSent:"02-12-20 12:34", dateResponded: null, status:"accepted"},
        //     {residentName: "Guy from trainspotting", medicationName:"1kg heroin", pharmacyName:"Croyden corner", dateSent:"02-12-20 12:34", dateResponded: null, status:"rejected"}
        // ]
        let emailPreviews = emails.filter(x => emailType == "all" || x.status == emailType)
            .map((email,idx) =>
            <EmailPreview resident={email.residentName} medication={email.medicationName} pharmacy={email.pharmacyName}
                          dateSent={email.dateSent} dateResponded={email.dateResponded} status={email.status} key={idx} />
        );

        return (
            <main>
                <TitleBar title={"Emails Sent"}>
                    <Form.Control as={"select"} custom onChange={(e) => {
                        console.log(e)
                        console.log(e.target.value.toLowerCase())
                        this.setState({emailType: e.target.value.toLowerCase()})}
                    } >
                        <option>All</option>
                        <option>Accepted</option>
                        <option>Unresponded</option>
                        <option>Rejected</option>
                    </Form.Control>
                </TitleBar>
                <div className={"list"}>
                    {emailPreviews}
                </div>
            </main>
        );
    }
}

export default EmailPage;
