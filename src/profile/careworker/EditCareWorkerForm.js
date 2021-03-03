import React, { useState } from 'react';

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { backendUrl } from "../../config";

//Modal is used to have a pop-up box
//Form.Group controlId= is used for accessibility apparently https://react-bootstrap.github.io/components/forms/

const EditCareWorkerForm = (props) => {
    const [firstName, setFirstName] = useState(props.firstName||"");
    const [surName, setSurName] = useState(props.surName||"");
    let careWorkerId = props.cwId;


    const submit = e => {
        e.preventDefault();
        const data = { firstName, surName, careWorkerId }
        console.log(data);
        fetch(`${backendUrl}/careWorker`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
            .then(() => props.handleSubmission());
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header><Modal.Title>Edit CareHome Worker</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first Name"
                            onChange={e => setFirstName(e.target.value)} value={firstName}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSurName">
                        <Form.Label>Sur Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Sur Name"
                            onChange={e => setSurName(e.target.value)} value={surName}
                        />
                    </Form.Group>
                    <br></br>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={e => submit(e)}>
                        Edit CareHome Worker
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditCareWorkerForm;