import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ShowEmailContent = (props) => (
    <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
            <Modal.Title>Last Sent Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div dangerouslySetInnerHTML={{__html: props.emailHtml}} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ShowEmailContent;