import React, {useState} from 'react';

import PharmacyPreview from "./PharmacyPreview";
import TitleBar from "../shared/TitleBar";
import Button from "react-bootstrap/Button";

import "./PharmacyPage.css";
import AddPharmacyForm from "./AddPharmacyForm";

const PharmacyPage = (props) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <main>
            <TitleBar title={"My Pharmacies"}>
                <Button variant="primary" onClick={() => setShowForm(true)}>Add new</Button>
            </TitleBar>
            <div className={"list"}>
                <PharmacyPreview title={"Willmore Road Pharmacy"} isDefault={true} hasPhone={true} hasEmail={true}
                                 hasAddress={false}/>
                <PharmacyPreview title={"Medicines 4 u"} isDefault={false} hasPhone={true} hasEmail={true}
                                 hasAddress={true}/>
                <PharmacyPreview title={"David's drugs"} isDefault={false} hasPhone={false} hasEmail={true}
                                 hasAddress={false}/>
            </div>
            {showForm && <AddPharmacyForm show={showForm} handleClose={() => setShowForm(false)} />}
        </main>
    );
}

export default PharmacyPage;
