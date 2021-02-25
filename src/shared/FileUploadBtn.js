import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import FileUploadForm from "./FileUploadForm";

const FileUploadBtn = (props) => {
    const {isResident, id, name, onAddFile, edit} = props;
    const [showForm, setShowForm] = useState(false);

    const btnText = edit ? "Change image!" : "Upload image!"

    return (
        <div>
            <Button variant="outline-secondary" onClick={() => setShowForm(true)}>{btnText}</Button>
            {showForm && <FileUploadForm
                show={showForm}
                handleClose={() => setShowForm(false)}
                handleSubmission={() => {
                    setShowForm(false)
                }}
                id={id}
                isResident={isResident}
                name={name}
                onAddFile={onAddFile}
            />}
        </div>
    );
}

export default FileUploadBtn;