import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FileUploadForm = (props) => {
    const {isResident, id, handleSubmission, name, onAddFile} = props;
    const [file, setFile] = useState();

    const upload = () => {
        let formData = new FormData();
        formData.append("file", file);
        if (isResident) {
            formData.append("residentId", id);
        } else {
            formData.append("careWorkerId", id);
        }

        fetch("https://api.carehomehelper.tech/file", {
            method: 'POST',
            body: formData
        })
            .then(r => r.json())
            .then(r => {
                console.log(r);
                if (!r.status && r.status !== 200) {
                    onAddFile();
                }
                handleSubmission();
            })
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header><Modal.Title>Upload picture for {name}</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form>
                    <input type={"file"} id={"custom-file"} onChange={e => setFile(e.target.files[0])} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"secondary"} onClick={props.handleClose}>Close</Button>
                <Button variant="primary" onClick={e => upload()}>
                    Upload!
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FileUploadForm;