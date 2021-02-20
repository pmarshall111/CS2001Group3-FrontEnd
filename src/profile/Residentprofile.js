import React, {useEffect, useState} from 'react';
import TitleBar from "../shared/TitleBar";
import Button from "react-bootstrap/Button";
import "./Residentprofile.css";
import EditResidentForm from "./EditResidentForm";
import {backendUrl, imagesUrl} from "../config";
import FileUploadBtn from "../shared/FileUploadBtn";



const Residentprofile = (props) => {
    const {resId, firstName} = props;

    const [editForm, setEditForm] = useState(false);
    const [residentImage, setResidentImage] = useState("");

    let archived = props.archived;
    let residentId = props.resId;

    useEffect(() => {
        getResImg();
    }, []) //empty array to signify this func should only run once

    const getResImg = () => {
        fetch(`${imagesUrl}/resident/${resId}`)
            .then(r => {
                console.log("changing image")
                setResidentImage("");
                setTimeout(() => setResidentImage(`${imagesUrl}/resident/${resId}`), 100);
            })
    }

    function submit(e) {
        e.preventDefault();
        (archived ? archived=false : archived=true);
        const data = { residentId, archived };
        console.log(data);
        fetch(`${backendUrl}/resident`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
        window.location.reload(false);
    }

    let residentImageSection;
    if (residentImage !== "") {
        residentImageSection = <div className={"profile-pic"} style={{"background-image": `url(${imagesUrl}/resident/${resId})`}} alt="Resident profile image" />
    } else {
        residentImageSection = <FileUploadBtn isResident={true} id={resId} name={firstName} onAddFile={() => getResImg()} />
    }

    //oldImgSrc="https://i.imgur.com/MI2Pf2H.jpg"
    return (
        <main>
            <TitleBar title={"Resident Profile"}>
                <Button variant="primary" onClick={() => setEditForm(true)}>edit</Button>
                <Button variant="primary" > medication [coming soon™]</Button>
            </TitleBar>
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-md-3 .offset-md-2">
                        <div className={"profile-img-container"}>
                            <div className={"profile-pic-container"}>
                                {residentImageSection}
                            </div>
                            {imagesUrl ? <FileUploadBtn isResident={true} id={resId} name={firstName} onAddFile={() => getResImg()} edit={true} /> : ""}
                        </div>
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
                    firstName={props.firstName}
                    surName={props.surName}
                    age={props.age}
                    guardianName={props.guardName}
                    bio={props.bio}
                    handleClose={() => setEditForm(false)} 
                    handleSubmission={() => props.handleSubmission()}
                />}
            <Button variant="secondary" onClick={e => submit(e)}> {archived? "Restore" : "Archive"} </Button>
        </main>
    );
}

export default Residentprofile;
