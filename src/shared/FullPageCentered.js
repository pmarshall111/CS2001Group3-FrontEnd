import React from 'react';

import "./FullPageCentered.css"

const FullPageCentered = (props) => (
    <div className={"full-page-centered"} style={{"backgroundColor": props.background}} >
        <div>
            {props.children}
        </div>
    </div>
);

export default FullPageCentered;
