import React, { useState } from 'react';

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { backendUrl } from "../../config";

//Modal is used to have a pop-up box
//Form.Group controlId= is used for accessibility apparently https://react-bootstrap.github.io/components/forms/

const EditResidentForm = (props) => {
    const [firstName, setFirstName] = useState(props.firstName||"");
    const [surName, setSurName] = useState(props.surName||"");
    const [age, setAge] = useState(props.age||"");
    let residentId = props.resId;
    const [guardianName, setGuardianName] = useState(props.guardianName||"");
    const [bio, setBio] = useState(props.bio||"");


    const submit = e => {
        e.preventDefault();
        const data = { firstName, surName, guardianName, age, residentId, bio }
        console.log(data);
        fetch(`${backendUrl}/resident`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
            .then(() => props.handleSubmission());
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header><Modal.Title>Edit resident</Modal.Title></Modal.Header>
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
                    <Form.Group controlId="formGuardianName">
                        <Form.Label>Guardian Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Guardian Name"
                            onChange={e => setGuardianName(e.target.value)} value={guardianName}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Enter Age"
                            onChange={e => setAge(e.target.value)} value={age}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter Bio"
                            onChange={e => setBio(e.target.value)} value={bio}
                        />
                    </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={e => submit(e)}>
                        Edit Resident
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditResidentForm;