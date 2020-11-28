import React from 'react';

import "./TitleBar.css";
import {ArrowLeftCircle} from "react-bootstrap-icons";

const TitleBar = (props) => (
    <div className={"title-bar"}>
        <ArrowLeftCircle />
        <div className={"content-container"}>
            <h2>{props.title}</h2>
            <div>{props.children}</div>
        </div>
    </div>
);

export default TitleBar;
