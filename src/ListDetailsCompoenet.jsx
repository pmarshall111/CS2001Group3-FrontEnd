import React, { Component } from "react";
import MedicationDetailsService from "./MedicationsDetails";
import "./App.css";
class ListDetailsComponent extends Component {
  constructor() {
    super();
    this.state = {
      medication: [],
    };
  }

  componentDidMount() {
    MedicationDetailsService.getDetails().then((res) => {
      console.log(res);
      this.setState({ medication: res.data });
    });
  }

  render() {
    const { medication } = this.state;
    return (
      <div>
        <h2 className="text-center">Medication Detail</h2>

        <div className="row">
          <table className="table table-dark table-hover">
            <tbody>
              <tr>
                <th>Description</th>
                <th>Dosage</th>
                {/*<th>Medication Class</th>*/}
                <th>Medication Name</th>
                <th>Pharmacy Name</th>
                <th>Count</th>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td>{medication.description}</td>
                <td>{medication.dosage}</td>
                <td>{medication.medicationName}</td>
                <td>{medication.pharmacyName}</td>
                <td>{medication.medicationCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListDetailsComponent;
