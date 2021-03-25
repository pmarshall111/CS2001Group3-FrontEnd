import React, {useEffect, useState} from 'react';
import TitleBar from "../../shared/TitleBar";
import Button from "react-bootstrap/Button";
import "./Residentprofile.css";
import EditResidentForm from "./EditResidentForm";
import {backendUrl, imagesUrl} from "../../config";
import FileUploadBtn from "../../shared/FileUploadBtn";
import Timeline from "../../shared/Timeline";
import { useHistory } from "react-router-dom";
import MedicationCountsPage from "../../medication/viewAudit/MedicationCountPage";



const Residentprofile = (props) => {
    const {resId, firstName, pharmacies} = props;

    const [editForm, setEditForm] = useState(false);
    const [residentImage, setResidentImage] = useState("");
    const [medicationDoses, setMedicationDoses] = useState([]);

    const history = useHistory();

    let archived = props.archived;
    let residentId = props.resId;

    useEffect(() => {
        getResImg();
        getResDosages();
    }, []) //empty array to signify this func should only run once

    const getResImg = () => {
        fetch(`${imagesUrl}/resident/${resId}`)
            .then(r => {
                console.log("changing image")
                setResidentImage("");
                setTimeout(() => setResidentImage(`${imagesUrl}/resident/${resId}`), 100);
            })
    }

    const getResDosages = () => {
        fetch(`${backendUrl}/medication/schedule/?residentId=${resId}`)
            .then(r => r.json())
            .then(r => {
                console.log(r)
                const dosages = r.map(x => {
                    return {...x, time: new Date(x.time), resident: x.residentName.split(" ")[0], dose: x.dose, medicationName:x.medicationName}
                })
                setMedicationDoses(dosages);
            })
    }

    function submit(e) {
        e.preventDefault();
        (archived ? archived=false : archived=true);
        const data = { residentId, archived };
        console.log(data);
        fetch(`${backendUrl}/resident`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
            .then(() => props.handleSubmission());
    }

    let residentImageSection;
    if (residentImage !== "") {
        residentImageSection = <div className={"profile-pic"} style={{"backgroundImage": `url(${imagesUrl}/resident/${resId})`}} alt="Resident profile image" />
    } else {
        residentImageSection = <FileUploadBtn isResident={true} id={resId} name={firstName} onAddFile={() => getResImg()} />
    }

    if (window.location.pathname.split("/")[3] === "medication") {
        return <MedicationCountsPage updateResDosages={() => getResDosages()} resName={firstName} resId={resId} pharmacies={pharmacies} />
    }

    //oldImgSrc="https://i.imgur.com/MI2Pf2H.jpg"
    return (
        <main>
            <TitleBar title={"Resident Profile"}>
                <Button variant="primary" onClick={() => setEditForm(true)}>Edit Profile</Button>
                <Button variant="primary" onClick={() => history.push(`/resident/${props.resId}/medication`)}> Medication Details</Button>
            </TitleBar>
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-md-3 .offset-md-2">
                        <div className={"profile-img-container"}>
                            <div className={"profile-pic-container"}>
                                {residentImageSection}
                            </div>
                            {residentImage !== "" ? <FileUploadBtn isResident={true} id={resId} name={firstName} onAddFile={() => getResImg()} edit={true} /> : ""}
                        </div>
                        <h1>{props.firstName} {props.archived ? "[ARCHIVED]" : ""}</h1>
                        <h3>Age: {props.age}</h3>
                        <h3>Guardian: {props.guardName}</h3>
                        <h3>Contact Number: 02089991273</h3> 
                        <h3>E-mail:example@hotmail.co.uk</h3>
                        <Button variant="secondary" onClick={e => submit(e)}> {archived? "Restore" : "Archive"} </Button>
                    </div>
                    <div className="col-md-6">
                        <div className={"resident-bio"}>
                            <h1>Notes</h1>
                            <p>{props.bio}</p>
                        </div>
                        <div>
                            <h1>Medication Schedule</h1>
                            <Timeline dosages={medicationDoses} />
                        </div>
                    </div>
                </div>
            </div>
            {editForm && <EditResidentForm
                    show={editForm}
                    resId={props.resId}
                    firstName={props.firstName}
                    surName={props.surName}
                    age={props.age}
                    guardianName={props.guardName}
                    bio={props.bio}
                    handleClose={() => setEditForm(false)} 
                    handleSubmission={() => {
                        setEditForm(false);
                        props.handleSubmission();
                    }}
                />}
        </main>
    );
}

export default Residentprofile;
