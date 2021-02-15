import React from 'react';
import TitleBar from "../shared/TitleBar";
import Button from "react-bootstrap/Button";
import { backendUrl } from "../config";

//import "./PharmacyPage.css";
import AddResidentForm from "./AddResidentForm";
import ResidentPreview from './ResidentPreview';
// import Residentprofile from './Residentprofile';

class ResidentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {residents: [], showForm: false };
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb() {
        const options = {
            method: 'GET'
        }
        
        fetch(`${backendUrl}/resident/all?careHomeId=7`, options)
            .then(response => response.text())
            .then(response => {
                console.log(JSON.parse(response))
                this.setState({residents: JSON.parse(response)})
            })
    }

    handleSubmission() {
        fetch(`${backendUrl}/resident`, {method: "POST", body: "", headers: {"Content-Type": "application/json"}})
            .then(response => this.getDataFromDb());
        this.setState({showForm: false})
        window.location.reload(false);
    }

    render() {
        let {residents, showForm} = this.state;
        let residentPreviews = residents.map((resident,idx) =>
        <ResidentPreview handleSubmission={() => this.handleSubmission()} 
                                                archived={resident.archived} 
                                                title={resident.firstName} 
                                                resId={resident.residentId}
                                                bio={resident.bio}
                                                age={resident.age} 
                                                guardName={resident.guardianName}
                                                key={idx} />
        );
        
        
        return (
            <main>
                <TitleBar title={"My Residents"}>
                    <Button variant="primary" onClick={() => this.setState({showForm: true})}>Add new</Button>
                </TitleBar>
                <div className={"list"}>
                    {residentPreviews}
                </div>
                {showForm && <AddResidentForm
                    show={showForm}
                    handleClose={() => this.setState({showForm: false})} 
                    handleSubmission={() => this.handleSubmission()}
                />}
            </main>
        );
    }
    
}
    export default ResidentsList;
