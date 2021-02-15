import React from 'react';

import "./Quote.css";

const Quote = (props) => (
    <div className={"quote-container"}>
        <p>{props.quote}</p>
    </div>
);

export default Quote;
