import React, {useEffect, useState} from 'react';
import TitleBar from "../../shared/TitleBar";
import Button from "react-bootstrap/Button";
import "./CareWorkerProfile.css";
import EditCareWorkerForm from "./EditCareWorkerForm";
import {backendUrl, imagesUrl} from "../../config";
import FileUploadBtn from "../../shared/FileUploadBtn";



const CareWorkerProfile = (props) => {
    const {cwId, firstName} = props;

    const [editForm, setEditForm] = useState(false);
    const [CareWorkerImage, setCareWorkerImage] = useState("");

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
                <Button variant="primary" onClick={() => setEditForm(true)}>edit</Button>
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
                        <h1>{props.firstName} {props.archived ? "[ARCHIVED]" : ""}</h1>
                        <h3>Contact Number: 02089991273</h3> 
                        <h3>E-mail:example@hotmail.co.uk</h3>
                        <Button variant="secondary" onClick={e => submit(e)}> {archived? "Restore" : "Archive"} </Button>
                    </div>
                    <div className="col-md-6">
                        <div className={"CareWorker-bio"}>
                            <h1>Bio</h1>
                            <p>{props.bio}</p>
                        </div>
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
