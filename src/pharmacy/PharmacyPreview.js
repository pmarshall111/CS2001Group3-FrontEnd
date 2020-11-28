import React from 'react';
import Button from "react-bootstrap/Button";
import {EnvelopeFill, HouseFill, TelephoneFill} from "react-bootstrap-icons";

import "./PharmacyPreview.css";

const PharmacyPreview = (props) => (
    <div className={`${props.isDefault ? "default" : ""} pharm-container`}>
        <h4>{props.title}</h4>
        <div className={"icon-container"}>
                <TelephoneFill className={props.hasPhone ? "completed" : "incomplete"} />
                <HouseFill className={props.hasAddress ? "completed" : "incomplete"} />
                <EnvelopeFill className={props.hasEmail ? "completed" : "incomplete"} />
        </div>
        <div className={`${props.isDefault ? "default" : ""} default-box`}>
                {props.isDefault ? "Default" : <Button variant="secondary">Make Default</Button>}
        </div>
    </div>
);

export default PharmacyPreview;
