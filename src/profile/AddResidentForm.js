import React from 'react';

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//Modal is used to have a pop-up box
//Form.Group controlId= is used for accessibility apparently https://react-bootstrap.github.io/components/forms/

const AddResidentForm = (props) => (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header><Modal.Title>Add new Resident</Modal.Title></Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formAddResidentName">
                    <Form.Label>Resident Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formResidentEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formAddResidentPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter numb" />
                </Form.Group>
                <Form.Group controlId="formAddResidentAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter address" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
                Add new Resident
            </Button>
        </Modal.Footer>
    </Modal>
);

export default AddResidentForm;
