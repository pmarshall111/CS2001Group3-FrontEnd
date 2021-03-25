import React from 'react';
import {Navbar} from "react-bootstrap";

import "./Navbar.css";
import {useHistory} from "react-router-dom";

const NavbarCentreTitle = (props) => {
    const history = useHistory();

    return (
        <Navbar bg={"light"}>
            <h1>Welcome to Care-Home-Helper!</h1>
        </Navbar>
    );
}

export default NavbarCentreTitle;