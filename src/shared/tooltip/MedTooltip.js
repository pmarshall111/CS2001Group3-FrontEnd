import React from 'react';
import {ListGroup} from "react-bootstrap";

//MedTooltip will receive an array of the medications for a certain time.
const MedTooltip = (props) => {
    const {medications} = props;
console.log(medications)
    const items = medications.map(med => {
        const {dose, medicationName} = med;
        return (
            <ListGroup.Item>
                <div>
                    <h3>{dose} {medicationName}</h3>
                </div>
            </ListGroup.Item>
        )
    })

    return (
        <ListGroup>
            {items}
        </ListGroup>
    );
}

export default MedTooltip;