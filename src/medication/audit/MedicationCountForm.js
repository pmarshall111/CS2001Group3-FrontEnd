'use strict';
import React, { Component, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom'
import {FormCheck, FormControl, FormGroup, Modal, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {backendUrl} from "../../config";


const MedicationCountForm = (props) => {
    let {resName, resMedications, handleClose, handleSubmission, show} = props;

    const [currMedForResId, setCurrMedForResId] = useState(resMedications[0] ? resMedications[0].medForResId : -1);
    const [isMorningCount, setIsMorningCount] = useState();
    const [count, setCount] = useState();
    const [careWorkerName, setCareWorkerName] = useState();

    resMedications = [{}, ...resMedications]; //adding blank record at the start

    const sendCountToBackend = e => {
        if (currMedForResId != undefined && currMedForResId !== "" &&
            isMorningCount != undefined && count != undefined && careWorkerName != undefined) {
            const data = {medForResId: currMedForResId, isMorningCount, count, careWorkerName};
            fetch(`${backendUrl}/medicationcounts/add`,  {method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}})
                .then(r => r.json())
                .then(r => {
                    console.log(r);
                    handleSubmission();
                })
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header><Modal.Title>Adding a count for {resName}</Modal.Title></Modal.Header>
          <Modal.Body>
              <h5>Medication</h5>
              <Form.Control as="select" value={currMedForResId} onChange={e => {
                  console.log(e.target)
                  setCurrMedForResId(e.target.value)
              }}>
                  {resMedications.map((x,idx) => <option value={x.id} key={idx + x.medicationName}>{x.medicationName}</option>)}
              </Form.Control>
            <h5>Count:</h5>
            <FormControl type={"number"} value={count} onChange={e => setCount(e.target.value)}/>
            <h5>Which count is this?</h5>
            <FormGroup>
              <FormCheck type={"radio"} label={"Morning count"} name={"countRadios"} id={"morning-radio"}
                        onClick={e => setIsMorningCount(true)} />
              <FormCheck type={"radio"} label={"Evening count"} name={"countRadios"} id={"evening-radio"}
                         onClick={e => setIsMorningCount(false)} />
            </FormGroup>
              <h5>Care worker who conducted count:</h5>
              <FormControl value={careWorkerName} onChange={e => setCareWorkerName(e.target.value)} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"secondary"} onClick={handleClose}>Close</Button>
            <Button variant={"success"} onClick={sendCountToBackend}>Submit!</Button>
          </Modal.Footer>
        </Modal>
    );

}

export default MedicationCountForm;
