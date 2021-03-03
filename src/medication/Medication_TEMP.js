import React, {useState} from 'react';
import NewMedicationForm from "./NewMedicationForm";

const MedicationTemp = (props) => {
    const {pharmacies} = props;
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add new Medication!</button>
            {showForm && <NewMedicationForm
                resId={0}
                resName="Roger"
                pharmacies={pharmacies}
                show={showForm}
                handleClose={() => setShowForm(false)}
                handleSubmission={() => setShowForm(false)} />
                }
        </div>

    )
};

export default MedicationTemp;