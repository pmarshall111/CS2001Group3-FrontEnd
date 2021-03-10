import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


// import Button from "react-bootstrap/Button";
// import {EnvelopeFill, HouseFill, TelephoneFill} from "react-bootstrap-icons";
// import Residentprofile from "./Residentprofile";
// import ArchResProf from "./ArchResProf";
import "./CareWorkerPreview.css";

const CareWorkerPreview = (props) => {
    const history = useHistory();
    return (
        <Router>
            <div>
                <div onClick={() => history.push(`/careWorker/${props.cwId}`)}>
                    {props.firstName} {props.archived ? "[ARCHIVED]" : ""}
                </div>
            </div>
        </Router>

    );
}
export default CareWorkerPreview;


// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//     {props.archived ?
//         // If archived
//         <Link to={'/ArchResProf'} className="nav-link"> {props.firstName} [ARCHIVED]</Link>
//         // else
//         : <Link to={'/Residentprofile'} className="nav-link"> {props.firstName} </Link>
//     }
// </nav>
// <Switch>
//     {props.archived ?
//         // If archived
//         <Route path='/ArchResProf' component={() => <ArchResProf
//             handleSubmission={() => props.handleSubmission()}
//             resId={props.resId}
//             firstName={props.firstName}
//             archived={props.archived}/>}/>
//         // else
//         : <Route path='/Residentprofile' component={() => <Residentprofile
//             handleSubmission={() => props.handleSubmission()}
//             resId={props.resId}
//             bio={props.bio}
//             age={props.age}
//             guardName={props.guardName}
//             firstName={props.firstName}
//             surName={props.surName}
//             archived={props.archived}/>}/>
//     }
// </Switch>
