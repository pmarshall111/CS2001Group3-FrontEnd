import React from 'react';
import TitleBar from "../../shared/TitleBar";
import Button from "react-bootstrap/Button";
import { backendUrl } from "../../config";

//import "./PharmacyPage.css";
import AddResidentForm from "./AddResidentForm";
import ResidentPreview from './ResidentPreview';
import Residentprofile from "./Residentprofile";
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
        fetch(`${backendUrl}/resident/all?careHomeId=${this.props.careHomeId}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (!response.status || response.status === 200) {
                    this.setState({residents: response})
                }
            })
    }

    handleSubmission() {
        this.setState({showForm: false})
        this.getDataFromDb();
    }

    render() {
        let id = window.location.pathname.split("/")[2];
        console.log(id)

        const {residents, showForm} = this.state;

        console.log(this.state.residents, this.state.residents.length)

        if (id) {
            //need to go through all residents and find the one with this ID
            const resident = this.state.residents.filter(x => x.residentId == id)[0]
            if (resident) {
                const {residentId, bio, age, guardName, firstName, surName, archived} = resident;
                return (
                    <Residentprofile
                        resId={residentId}
                        bio={bio}
                        age={age}
                        guardName={guardName}
                        firstName={firstName}
                        surName={surName}
                        archived={archived}
                    handleSubmission={() => this.handleSubmission()}/>
                )
            }
        }

        //we don't add else here. designed so that if the ID isn't a resident, we still display the list.
        let residentPreviews = residents.map((resident,idx) =>
            <ResidentPreview handleSubmission={() => this.handleSubmission()}
                                                archived={resident.archived} 
                                                firstName={resident.firstName} 
                                                surName={resident.surName}
                                                resId={resident.residentId}
                                                bio={resident.bio}
                                                age={resident.age} 
                                                guardName={resident.guardianName}
                                                key={idx} />
        );
        
        
        return (
            <main>
                <TitleBar title={"My Residents"}>
                    <Button variant="primary" size="lg" onClick={() => this.setState({showForm: true})}>Add new</Button>
                </TitleBar>
                <div className={"list"}>
                    {residentPreviews}
                </div>
                {showForm && <AddResidentForm
                    show={showForm}
                    handleClose={() => this.setState({showForm: false})} 
                    handleSubmission={() => this.handleSubmission()}
                    careHomeId={this.props.careHomeId}
                />}
            </main>
        );
    }
    
}
    export default ResidentsList;
