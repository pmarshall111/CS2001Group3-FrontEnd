import React from 'react';

import PharmacyPreview from "./PharmacyPreview";
import TitleBar from "../shared/TitleBar";
import Button from "react-bootstrap/Button";

import "./PharmacyPage.css";
import AddPharmacyForm from "./AddPharmacyForm";
import {backendUrl} from "../config";

class PharmacyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showForm: false};
    }

    render() {
        let {pharmacies, careHomeId, pharmaciesHaveChanged} = this.props;
        let {showForm} = this.state;
        let pharmacyPreviews = pharmacies.map((pharmacy,idx) =>
            <PharmacyPreview title={pharmacy.name} isDefault={pharmacy.default}
                             hasPhone={pharmacy.phoneNumb} hasEmail={pharmacy.email}
                             hasAddress={pharmacy.address && pharmacy.address.length>0} key={idx} /> );

        return (
            <main>
                <TitleBar title={"My Pharmacies"}>
                    <Button variant="primary" onClick={() => this.setState({showForm: true})}>Add new</Button>
                </TitleBar>
                <div className={"list"}>
                    {pharmacyPreviews}
                </div>
                {showForm && <AddPharmacyForm
                    show={showForm}
                    handleClose={() => this.setState({showForm: false})}
                    handleSubmission={() => {
                        pharmaciesHaveChanged();
                        this.setState({showForm: false})
                    }}
                    careHomeId={this.props.careHomeId}
                />}
            </main>
        );
    }
}

export default PharmacyPage;
