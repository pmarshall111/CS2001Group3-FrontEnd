import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import FileUploadForm from "./FileUploadForm";

const FileUpload = (props) => {
    const {isResident, id} = props;
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <Button variant="primary" onClick={() => setShowForm(true)}>Upload file</Button>
            {showForm && <FileUploadForm
                show={showForm}
                handleClose={() => setShowForm(false)}
                handleSubmission={() => {
                    setShowForm(false)
                }}
                id={id}
                isResident={isResident}
            />}
        </div>
    );
}

export default FileUpload;