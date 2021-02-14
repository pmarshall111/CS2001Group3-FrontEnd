import React, {useState} from 'react';
import TitleBar from "../shared/TitleBar";
import Button from "react-bootstrap/Button";
import "./Residentprofile.css";
import EditResidentForm from "./EditResidentForm";


const Residentprofile = (props) => {
    const [editForm, setEditForm] = useState(false);
    const [archived, setArchive] = useState(props.arch);

    return (
        <main>
            <TitleBar title={"Resident Profile"}>
                <Button variant="primary" onClick={() => setEditForm(true)}>edit</Button>
                <Button variant="primary" > medication</Button>
                <Button variant="primary" onClick={() => {archived? setArchive(false) : setArchive(true)}}>Archive</Button>
            </TitleBar>
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-md-3 .offset-md-2">
                        <img src="https://i.imgur.com/MI2Pf2H.jpg" width="400" height="400" className="img-thumbnail" alt="..."></img>
                        <h1>{props.firstName}</h1>
                        <h3>Age: {props.age}</h3>
                        <h3>Guardian: {props.guardName}</h3>
                        <h3>Contact Number: 02089991273</h3> 
                        <h3>E-mail:example@hotmail.co.uk</h3>  
                    </div>
                    <div className="col-md-6">
                        <h1>Bio</h1>
                        <p>{props.bio}</p> 
                
                    </div>
                </div>
            </div>
            {editForm && <EditResidentForm
                    show={editForm}
                    resId={props.resId}
                    handleClose={() => setEditForm(false)} 
                    handleSubmission={() => props.handleSubmission()}
                />}
            
        </main>
    );
}

export default Residentprofile;
