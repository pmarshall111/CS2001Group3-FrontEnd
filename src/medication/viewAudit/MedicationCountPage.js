
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import './ViewAudit.css' ;

import "react-datepicker/dist/react-datepicker.css";
import {convertToYYYYMMDD} from "../../helper/convertTimestampToDate";
import Button from "react-bootstrap/Button";
import {datesAreSameDay} from "../../helper/dateHelper";
import TitleBar from "../../shared/TitleBar";
import NewMedicationForm from "../NewMedicationForm";
import {FormCheck, FormControl, FormGroup, Modal} from "react-bootstrap";
import {Row} from "react-bootstrap";
import MedicationCountForm from "../audit/MedicationCountForm";
import {backendUrl} from "../../config";
import {ArrowLeft, ArrowRight} from "react-bootstrap-icons";

const MedicationCountPage = props => {
    const [counts, setCounts] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showAddMedicationForm, setShowAddMedicationForm] = useState(false);
    const [showAddCountForm, setShowAddCountForm] = useState(false);
    const [residentsMedications, setResidentsMedications] = useState([])

    const {resName, medName, resId, pharmacies} = props;

    useEffect(() => {
        getCounts();
        getMedications();
    }, [])


  const getCounts = () => {
      fetch(`${backendUrl}/medicationcounts?resId=${resId}`)
          .then(response => response.json())
          .then(response => {
              setCounts(response);
          })
  }

  const getMedications = () => {
      fetch(`${backendUrl}/medication/resident?residentId=${resId}`)
          .then(r => r.json())
          .then(r => {
              setResidentsMedications(r)
          })
  }

  const renderTableData = () => {
    let auditsToDisplay = counts;
    if (selectedDate != null) {
      auditsToDisplay = auditsToDisplay.filter((x) => {
        return datesAreSameDay(new Date(convertToYYYYMMDD(x.countDoneOnDate)), selectedDate);
      })
    }
    return auditsToDisplay.map((audit, index) =>{
      const {medCountId, count, countDoneOnDate, cyclePredictedToEndOn, medName,
          careWorkerName, isMorningCount,medForResId} = audit
      return(
          <tr key={medCountId}>
            <td>{medName}</td>
            <td>{convertToYYYYMMDD(countDoneOnDate)}</td>
              <td>{count}</td>
            <td>{isMorningCount ? "Morning" : "Evening"}</td>
            <td>{careWorkerName}</td>
              <td>{cyclePredictedToEndOn == null ? "-" : convertToYYYYMMDD(cyclePredictedToEndOn)}</td>
          </tr>
      )
    })
  }

    const changeDateByArrow = goBackwards => {
        if (selectedDate == null) {
            setSelectedDate(new Date());
        } else if (goBackwards) {
            let dateCopy = new Date(selectedDate);
            dateCopy.setDate(selectedDate.getDate()-1);
            setSelectedDate(dateCopy);
        } else {
            let dateCopy = new Date(selectedDate);
            dateCopy.setDate(selectedDate.getDate()+1);
            setSelectedDate(dateCopy);
        }
    }

    return(

        <div className="container" id ="main">
            <TitleBar title={`${resName}'s Medication Counts`}>
                <Button onClick={() => setShowAddMedicationForm(true)}>Add new Medication</Button>
                <Button onClick={() => setShowAddCountForm(true)}>Add new count</Button>
            </TitleBar>
          <div className="row justify-content-center" id ="main2">
            <div className="count-intros">
                <h1>Select Historic Audit</h1>
                <div className="count-date-picker">
                    <div>
                        <ArrowLeft className={"pointer"} onClick={() => changeDateByArrow(true)} />
                        <DatePicker type="date" id="date-pick" selected={selectedDate} onChange={e => setSelectedDate(new Date(e))} />
                        <ArrowRight className={"pointer right-pointer"} onClick={() => changeDateByArrow(false)} />
                    </div>
                    <Button onClick={() => setSelectedDate(null)}>Clear Date</Button>
                </div>
            </div>
            <Table
                data-toggle = "table"
                data-url="http://localhost:8080/show?medCountId={this.props.medCountId}"
                data-search ="true"
                data-pagination = "true"
                responsive>
              <thead>
              <tr>
                <th data-field="name"> Medication </th>
                <th data-field="date"> Date Recorded </th>
                <th data-field="number"> Count </th>
                <th data-field="number"> Morning or Evening </th>
                <th data-field="name"> Staff Name </th>
                  <th data-field="end-prediction"> Stock lasts until </th>
              </tr>
              </thead>
              <tbody>
              {renderTableData()}
              </tbody>
            </Table>
          </div>
            {showAddMedicationForm && <NewMedicationForm
                resId={resId}
                resName={resName}
                pharmacies={pharmacies}
                show={showAddMedicationForm}
                handleClose={() => setShowAddMedicationForm(false)}
                handleSubmission={() => {
                    getMedications();
                    setShowAddMedicationForm(false)}}
            />
            }
            {showAddCountForm && <MedicationCountForm
                resId={resId}
                resName={resName}
                resMedications={residentsMedications}
                show={showAddCountForm}
                handleClose={() => setShowAddCountForm(false)}
                handleSubmission={() => {
                    getCounts();
                    setShowAddCountForm(false);
                }}
            />
            }
        </div>
    );

}

export default MedicationCountPage;