import React, {useState} from 'react';
import TitleBar from "../shared/TitleBar";
import Button from "react-bootstrap/Button";
import "./Residentprofile.css";
import EditResidentForm from "./EditResidentForm";


const ArchResProf = (props) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <main>
            <TitleBar title={"Resident Profile"}>
                <Button variant="primary" onClick={() => setShowForm(true)}>edit</Button>
                <Button variant="primary" onClick={() => setShowForm(true)}>medication</Button>
            </TitleBar>
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-md-3 .offset-md-2">
                        <img src="https://i.imgur.com/MI2Pf2H.jpg" width="400" height="400" className="img-thumbnail" alt="..."></img>
                        <h1>{props.firstName} -- ARCHIVED RESIDENT</h1> 
                    </div>
                    <div className="col-md-6">
                                   
                    </div>
                </div>
            </div>
            {showForm && <EditResidentForm
                    show={showForm}
                    resId={props.resId}
                    handleClose={() => setShowForm(false)} 
                    handleSubmission={() => props.handleSubmission()}
                />}
            
        </main>
    );
}

export default ArchResProf;
