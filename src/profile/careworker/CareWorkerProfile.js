import React, {useEffect, useState} from 'react';
import TitleBar from "../../shared/TitleBar";
import Button from "react-bootstrap/Button";
import "./CareWorkerProfile.css";
import EditCareWorkerForm from "./EditCareWorkerForm";
import {backendUrl, imagesUrl} from "../../config";
import FileUploadBtn from "../../shared/FileUploadBtn";
import Alert from 'react-bootstrap/Alert';


const CareWorkerProfile = (props) => {
    const {cwId, firstName} = props;

    const [editForm, setEditForm] = useState(false);
    const [CareWorkerImage, setCareWorkerImage] = useState("");
    const [operationMessage, setOperationMessage] = useState();
    const [showAlert, setShowAlert] = useState(false);
    
    let archived = props.archived;
    let careWorkerId = props.cwId;

    useEffect(() => {
        getCwImg();
    }, []) //empty array to signify this func should only run once

    const getCwImg = () => {
        fetch(`${imagesUrl}/careworker/${cwId}`)
            .then(r => {
                console.log("changing image")
                setCareWorkerImage("");
                setTimeout(() => setCareWorkerImage(`${imagesUrl}/careworker/${cwId}`), 100);
            })
    }

    const handleSubmission = () => {
        setEditForm(false);
        props.handleSubmission();
    }

    function submit(e) {
        e.preventDefault();
        (archived ? archived=false : archived=true);
        const data = { careWorkerId, archived };
        console.log(data);
        fetch(`${backendUrl}/careWorker`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
            .then(() => props.handleSubmission());
    }

    function WorkerDelete(k) {
        k.preventDefault();
        fetch(`${backendUrl}/careWorker/?careWorkerId=${cwId}`, { method: "DELETE", headers: { "Content-Type": "application/json" } })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.status){
                console.log(response.status)
                setOperationMessage(response.operationMessage)
                setShowAlert(true);
            }
        })
        .then(() => props.handleSubmission());
    }

    let CareWorkerImageSection;
    if (CareWorkerImage !== "") {
        CareWorkerImageSection = <div className={"profile-pic"} style={{"backgroundImage": `url(${imagesUrl}/careworker/${cwId})`}} alt="CareWorker profile image" />
    } else {
        CareWorkerImageSection = <FileUploadBtn isCareWorker={true} id={cwId} name={firstName} onAddFile={() => getCwImg()} />
    }

    //oldImgSrc="https://i.imgur.com/MI2Pf2H.jpg"
    return (
        <main>
            <TitleBar title={"CareHome Worker Profile"}>
                <Button variant="primary" size="lg" onClick={() => setEditForm(true)}>Edit profile</Button>
            </TitleBar>
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-md-3 .offset-md-2">
                        <div className={"profile-img-container"}>
                            <div className={"profile-pic-container"}>
                                {CareWorkerImageSection}
                            </div>
                            {CareWorkerImage !== "" ? <FileUploadBtn isCareWorker={true} id={cwId} name={firstName} onAddFile={() => getCwImg()} edit={true} /> : ""}
                        </div>
                        <h1>{props.firstName} {props.archived ? "[ARCHIVED]" : props.surName}</h1>
                        <h3>{props.archived ? "" : "Contact Number: 02089991273"}</h3> 
                        <h3>{props.archived ? "" : "E-mail:example@hotmail.co.uk"}</h3>
                        
                        <Button variant="secondary" size="lg" onClick={e => submit(e)}> {archived? "Restore" : "Archive"} </Button>
                        <br></br><br></br>
                        {archived? <Button variant="danger" size="lg" onClick={k => WorkerDelete(k)}> Delete </Button> : "" }
                        
                        {operationMessage&&showAlert?
                        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                            {operationMessage}
                            </p>
                        </Alert>
                        : ""
                        }
                    </div>
                    <div className="col-md-6">
                        {props.archived? "" : 
                        <div className={"CareWorker-bio"}>
                            <h1>Bio</h1>
                            <p>{props.bio}</p>
                        </div>
                        }
                        {/* could add list of assigned to-dos */}
                    </div>
                </div>
            </div>
            {editForm && <EditCareWorkerForm
                    show={editForm}
                    cwId={props.cwId}
                    firstName={props.firstName}
                    surName={props.surName}
                    handleClose={() => setEditForm(false)} 
                    handleSubmission={() => handleSubmission()}
                />}
        </main>
    );
}

export default CareWorkerProfile;
