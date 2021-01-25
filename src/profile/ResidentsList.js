import React, { useState } from 'react';
import TitleBar from "../shared/TitleBar";
import Button from "react-bootstrap/Button";


//import "./PharmacyPage.css";
import AddResidentForm from "./AddResidentForm";

const ResidentsList = (props) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <main>
            <TitleBar title={"My Residents"}>
                <Button variant="primary" onClick={() => setShowForm(true)}>Add new</Button>
            </TitleBar>
            <div class="list-group">
                <a href="/profile/Residentprofile.js" class="list-group-item list-group-item-action"> John Doe</a>

            </div>
            {showForm && <AddResidentForm show={showForm} 
            handleClose={() => setShowForm(false)}
            handleSubmission={() => setShowForm(false)}
            />}
        </main>
    );
}
export default ResidentsList;
