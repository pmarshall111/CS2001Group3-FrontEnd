import React, {useState} from 'react';

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {backendUrl} from "../config";

//Modal is used to have a pop-up box
//Form.Group controlId= is used for accessibility apparently https://react-bootstrap.github.io/components/forms/

const AddPharmacyForm = (props) => {
    const [pharmacyName, setPharmacyName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumb, setPhoneNumb] = useState("");
    const [address, setAddress] = useState("");

    const submit = e => {
        e.preventDefault();
        const data = {name: pharmacyName, email, phoneNumb, address, careHomeId: props.careHomeId}
        console.log(data);
        fetch(`${backendUrl}/pharmacy`, {method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}})
            .then(r => props.handleSubmission());
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header><Modal.Title>Add new Pharmacy</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formAddPharmacyName">
                        <Form.Label>Pharmacy Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name"
                                      onChange={e => setPharmacyName(e.target.value)} value={pharmacyName} />
                    </Form.Group>
                    <Form.Group controlId="formAddPharmacyEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                                      onChange={e => setEmail(e.target.value)} value={email}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddPharmacyPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Enter numb"
                                      onChange={e => setPhoneNumb(e.target.value)} value={phoneNumb}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddPharmacyAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter address"
                                      onChange={e => setAddress(e.target.value)} value={address}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"secondary"} onClick={props.handleClose}>Close</Button>
                <Button variant="primary" onClick={e => submit(e)}>
                    Add new pharmacy
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddPharmacyForm;
