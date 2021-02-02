import React, {useEffect, useState} from 'react';
import MedTooltip from "./MedTooltip";
import ResidentTooltip from "./ResidentTooltip";

import "./ParentTooltip.css";

const ParentTooltip = (props) => {
    const {medicationsAtTime, isHovered, keepHovered, startHideTimer, xPos, yPos} = props;

    //need to get a list of the residents.
    let residentMeds = {};
    medicationsAtTime.forEach(med => {
        const {resident} = med;
        if (!residentMeds[resident]) {
            residentMeds[resident] = [med];
        } else {
            residentMeds[resident].push(med);
        }
    });


    //if we have just 1 resident, we need to render a list of the medications.
    //else render a list of the residents where you can view each of their medications.
    const numbResidents = Object.keys(residentMeds).length;
    let content;
    if (numbResidents === 1) {
        content = <MedTooltip medications={residentMeds[Object.keys(residentMeds)[0]]} />
    } else if (numbResidents !== 0) {
        content = <ResidentTooltip residentDict={residentMeds} />
    }

    return (
        <div id={"tooltip"} style={{"opacity": isHovered ? 1 : 0, "top": isHovered ? yPos+"px" : "-50px", "left": isHovered ? xPos+"px" : "0px" }}
             onMouseOver={() => {
                 console.log("over")
                 keepHovered();
             }}
             onMouseLeave={() => {
                 console.log("leave");
                 startHideTimer();
             }}>
            {content}
        </div>
    );
};

export default ParentTooltip;