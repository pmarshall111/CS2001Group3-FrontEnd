import React from 'react';
import TitleBar from "../../shared/TitleBar";
import Button from "react-bootstrap/Button";
import { backendUrl } from "../../config";

//import "./PharmacyPage.css";
import AddCareWorkerForm from "./AddCareWorkerForm";
import CareWorkerPreview from './CareWorkerPreview';
import CareWorkerProfile from "./CareWorkerProfile";
// import CareWorkerProfile from './CareWorkerProfile';

class CareWorkerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {careWorkers: [], showForm: false };
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb() {
        fetch(`${backendUrl}/careWorker/all?careHomeId=${this.props.careHomeId}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (!response.status || response.status === 200) {
                    this.setState({careWorkers: response})
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

        const {careWorkers, showForm} = this.state;

        console.log(this.state.careWorkers, this.state.careWorkers.length)

        if (id) {
            //need to go through all residents and find the one with this ID
            const careWorker = this.state.careWorkers.filter(x => x.careWorkerId == id)[0]
            if (careWorker) {
                const {careWorkerId, firstName, surName, archived} = careWorker;
                return (
                    <CareWorkerProfile
                        cwId={careWorkerId}
                        firstName={firstName}
                        surName={surName}
                        archived={archived}
                        handleSubmission={() => this.handleSubmission()}/>
                )
            }
        }

        //we don't add else here. designed so that if the ID isn't a resident, we still display the list.
        let careWorkerPreviews = careWorkers.map((careWorker,idx) =>
            <CareWorkerPreview handleSubmission={() => this.handleSubmission()}
                                                archived={careWorker.archived} 
                                                firstName={careWorker.firstName} 
                                                surName={careWorker.surName}
                                                cwId={careWorker.careWorkerId}
                                                key={idx} />
        );
        
        
        return (
            <main>
                <TitleBar title={"My CareHome Workers"}>
                    <Button variant="primary" onClick={() => this.setState({showForm: true})}>Add new</Button>
                </TitleBar>
                <div className={"list"}>
                    {careWorkerPreviews}
                </div>
                {showForm && <AddCareWorkerForm
                    show={showForm}
                    handleClose={() => this.setState({showForm: false})} 
                    handleSubmission={() => this.handleSubmission()}
                    careHomeId={this.props.careHomeId}
                />}
            </main>
        );
    }
    
}
    export default CareWorkerList;
