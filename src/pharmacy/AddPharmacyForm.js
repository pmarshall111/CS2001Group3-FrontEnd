import React from 'react';

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//Modal is used to have a pop-up box
//Form.Group controlId= is used for accessibility apparently https://react-bootstrap.github.io/components/forms/

const AddPharmacyForm = (props) => {
    const submit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log({formData, formDataObj});
        // props.handleSubmission
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header><Modal.Title>Add new Pharmacy</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formAddPharmacyName">
                        <Form.Label>Pharmacy Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group controlId="formAddPharmacyEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formAddPharmacyPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Enter numb" />
                    </Form.Group>
                    <Form.Group controlId="formAddPharmacyAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter address" />
                    </Form.Group>
                    <Button variant="primary" onClick={e => submit(e)}>
                        Add new pharmacy
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddPharmacyForm;
