import React, {useEffect, useState} from 'react';
import {FormControl, FormLabel, Modal, Tab, Tabs} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import MedicationDose from "./MedicationDose";
import Button from "react-bootstrap/Button";
import {backendUrl} from "../config";

import "./MedicationForm.css"

const NewMedicationForm = (props) => {
    const {resId, resName, pharmacies, show, handleClose, handleSubmission} = props;

    let [doseTimes, setDoseTimes] = useState([])
    const [medName, setMedName] = useState("");
    const [medDesc, setMedDesc] = useState("");
    const [selectedMedIdx, setSelectedMedIdx] = useState(0);
    const [selectedPharmacyIdx, setSelectedPharmacyIdx] = useState(0);
    const [activeKey, setActiveKey] = useState("select");
    const [currentMedications, setCurrMeds] = useState([{name: "Paracetamol", description: "Pain reliever", medicationId:1}, {name: "Nurofen", description: "Anti-inflamatory", medicationId:2}]);

    let doseForms = doseTimes.map((x, idx) => {
        const {time, repeats, dose} = x;
        return <MedicationDose key={idx} idx={idx} time={time} repeats={repeats} dose={dose}
                               doseTimes={doseTimes} setDoseTimes={(newDoses) => setDoseTimes(newDoses)} />
    })

    const submit = () => {
        let objToSend;
        if (activeKey === "add-new") {
            objToSend = {medName, medDesc, medDoses: doseTimes, resId, pharmacyId: pharmacies[selectedPharmacyIdx].pharmacyId};
        } else {
            const {name, description, medicationId} = currentMedications[selectedMedIdx];
            objToSend = {medName: name, medDesc: description, medId: medicationId, medDoses: doseTimes, resId, pharmacyId: pharmacies[selectedPharmacyIdx].pharmacyId};
        }
        //send off data
        console.log(objToSend)
        fetch(`${backendUrl}/medication`,
            {method: "POST", body: JSON.stringify(objToSend), headers: {"Content-Type": "application/json"}})
            .then(r => r.json())
            .then(r => {
                console.log(r);
                handleSubmission();
            });
    }

    useEffect( () => {
        fetch(`${backendUrl}/medication?careHomeId=0`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setCurrMeds(response)
            })
    }, []);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header><Modal.Title>New Medication for {resName}</Modal.Title></Modal.Header>
            <Modal.Body>
            <Form>
                <div className={"medications-container med-form-cont"}>
                    <h5>Medication</h5>
                    <Tabs activeKey={activeKey} onSelect={e => {
                        console.log(e);
                        setActiveKey(e)
                    }}>
                        <Tab eventKey={"select"} title={"Select"}>
                            <Form.Control as="select" value={selectedMedIdx} onChange={e => {
                                console.log(e.target.value)
                                setSelectedMedIdx(e.target.value)
                            }}>
                                {currentMedications.map((x,idx) => <option value={idx} key={idx + x.name}>{x.name}</option>)}
                            </Form.Control>
                        </Tab>
                        <Tab eventKey={"add-new"} title={"Add new"}>
                            <FormLabel>Name</FormLabel>
                            <FormControl type={"text"} placeholder={"Medication name..."} value={medName} onChange={e => setMedName(e.target.value)}/>
                            <FormLabel>Description</FormLabel>
                            <FormControl as={"textarea"} rows={3} placeholder={"Short description of the medication..."} value={medDesc} onChange={e => setMedDesc(e.target.value)}/>
                        </Tab>
                    </Tabs>
                </div>
                <div className={"pharmacy-container med-form-cont"}>
                    <h5>Pharmacy to email:</h5>
                    <Form.Control as="select" value={selectedPharmacyIdx} onChange={e => setSelectedPharmacyIdx(e.target.value)}>
                        {pharmacies.map((x,idx) => <option value={idx}>{x.name}</option>)}
                    </Form.Control>
                </div>
                <div className={"medications-dose-container med-form-cont"}>
                    <h5>Dose Times</h5>
                    {doseForms}
                    <Button variant={"light"} onClick={e => {
                        e.preventDefault();
                        setDoseTimes(doseTimes.concat({time: new Date(), dose: "25mg", repeats: "Every day"}))
                    }}>Add new +</Button>
                </div>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"secondary"} onClick={handleClose}>Close</Button>
                <Button variant={"success"} onClick={submit}>Submit!</Button>
            </Modal.Footer>
        </Modal>

);
}

export default NewMedicationForm;