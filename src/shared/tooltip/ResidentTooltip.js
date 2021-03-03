import React, {useEffect, useState} from 'react';
import {ListGroup} from "react-bootstrap";
import MedTooltip from "./MedTooltip";

import "./ResidentTooltip.css"

//ResidentTooltip gets an obj of residents as the key, with their medications for that time in an array as the val. {"roger": [{dose: 2, medication: paracetamol}]}
const ResidentTooltip = (props) => {
    const {residentDict, msBeforePopoverVanish} = props;
    const residents = Object.keys(residentDict).sort();
    const [activeResidentIdx, setActiveResidentIdx] = useState(0);

    let listItems = residents.map((res,idx) => {
        return (
            <ListGroup.Item active={idx === activeResidentIdx} action onClick={() => setActiveResidentIdx(idx)}>
                {res}
            </ListGroup.Item>)
    });

    useEffect(() => {
        setTimeout(() => setActiveResidentIdx(0), msBeforePopoverVanish);
        console.log("using effect")
    }, [residentDict])

    console.log(residentDict)

    return (
        <div id={"tooltip-residents"}>
            <ListGroup>
                {listItems}
            </ListGroup>
            <MedTooltip medications={residentDict[residents[activeResidentIdx]]} />
        </div>
    );
}

export default ResidentTooltip;