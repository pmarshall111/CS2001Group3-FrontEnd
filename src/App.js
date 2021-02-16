import { BrowserRouter as Router, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PharmacyPage from "./pharmacy/PharmacyPage";
import EmailPreview from "./email/EmailPreview";
import EmailPage from "./email/EmailPage";
import EmailConfirmation from "./email/EmailConfirmation";
import EmailInquiry from "./email/EmailInquiry";
//import MedicationDetailsPage from "./medication/MedicationDetailsPage";
import ListDetailsComponent from "./ListDetailsCompoenet";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      {/*<Dashboard />*/}
      <ListDetailsComponent />
      <Router>
        <Route path="/MedicationDetailsPage" component={ListDetailsComponent} />
        <Route exact path="/" component={EmailPage} />
        <Route path="/email/confirmation" component={EmailConfirmation} />
        <Route path="/email/inquiry" component={EmailInquiry} />
        <Route path="/pharmacy" component={PharmacyPage} />
      </Router>
    </div>
  );
}

export default App;
