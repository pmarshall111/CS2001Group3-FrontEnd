import React from 'react';
import { withRouter } from "react-router";

import "./TitleBar.css";
import {ArrowLeftCircle} from "react-bootstrap-icons";

const TitleBar = (props) => (
    <div className={"title-bar"}>
        <ArrowLeftCircle style={{"cursor": "pointer"}} onClick={() => props.history.go(-1)} />
        <div className={"content-container"}>
            <h2>{props.title}</h2>
            <div>{props.children}</div>
        </div>
    </div>
);

export default withRouter(TitleBar);
