import React from 'react';
import TitleBar from "../shared/TitleBar";
import Button from "react-bootstrap/Button";
import "./CareWorkerProfile.css";
import { backendUrl } from "../../config";



const ArchCwProf = (props) => {
    let archived = props.archived;
    let careWorkerId = props.resId;


    function submit(e) {
        e.preventDefault();
        (archived ? archived=false : archived=true);
        const data = { careWorkerId, archived };
        console.log(data);
        fetch(`${backendUrl}/careWorker`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
        window.location.reload(false);
    }
    return (
        <main>
            <TitleBar title={"[ARCHIVED CareHome Worker]"}>
                <Button variant="secondary" onClick={e => submit(e)}> {archived? "Restore" : "Archive"} </Button>
            </TitleBar>
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-md-3 .offset-md-2">
                        <img src="https://i.imgur.com/MI2Pf2H.jpg" width="400" height="400" className="img-thumbnail" alt="..."></img>
                        <h1>{props.firstName}</h1>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ArchCwProf;
