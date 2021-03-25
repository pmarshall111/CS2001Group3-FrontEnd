import React from 'react';
import Button from "react-bootstrap/Button";
import {EnvelopeFill, HouseFill, TelephoneFill} from "react-bootstrap-icons";

import "./PharmacyPreview.css";

const PharmacyPreview = (props) => (
    <div className={`pharm-container`}>
            <div className={"info-container"}>
            <h4>{props.title}</h4>
            <h6>{props.hasEmail ? props.hasEmail : ""}</h6>
            </div>
        <div className={"icon-container"}>
                <TelephoneFill className={props.hasPhone ? "completed" : "incomplete"} />
                <HouseFill className={props.hasAddress ? "completed" : "incomplete"} />
                <EnvelopeFill className={props.hasEmail ? "completed" : "incomplete"} />
        </div>
    </div>
);

export default PharmacyPreview;
