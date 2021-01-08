'use strict';
import React, { Component, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

class AddAudit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audits: [],
      name: '',
      dayCount: '',
      eveningCount: '',
      staffId: '',
      initialMedicationCount: ''
    };

    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
//   componentDidMount() {
//     // get all entities - GET
//     fetch("http://localhost:8080", {
//   "method": "GET",
//   "headers": {
//     'Content-Type': 'application/json',
//   }
// })
// .then(response => response.json())
// .then(response => {
//   this.setState({
//     audits: response
//   })
// })
// .catch(err => { console.log(err);
// });

//   }

  create(e) {
    // add entity - POST
    fetch("http://localhost:8080/addAudit", {
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "accept": "application/json"
  },
  "body": JSON.stringify({
    name: this.state.name,
    dayCount: this.state.dayCount,
    eveningCount: this.state.eveningCount,
    initialMedicationCount: this.state.initialMedicationCount,
    staffId: this.state.staffId
  })
})
.then(response => response.json())
.then(response => {
  console.log(response)
})
.catch(error => {
  console.log(error);
});

    e.preventDefault();
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Add Audit</h1>
              <form className="d-flex flex-column">
                <legend className="text-center">Add-Update-Delete Audit</legend>

                <label htmlFor="name">
                  Patient Name:
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.handleChange({ name: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="dayCount">
                  Day Count:
                  <input
                    name="dayCount"
                    id="dayCount"
                    type="number"
                    className="form-control"
                    value={this.state.dayCount}
                    onChange={(e) => this.handleChange({ dayCount: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="eveningCount">
                  Evening Count:
                  <input
                    name="eveningCount"
                    id="eveningCount"
                    type="number"
                    className="form-control"
                    value={this.state.eveningCount}
                    onChange={(e) => this.handleChange({ eveningCount: e.target.value })}
                    />
                </label>
                <label htmlFor="initialMedicationCount">
                  Initial Medication Count
                  <input
                    name="initialMedicationCount"
                    id="initialMedicationCount"
                    type="number"
                    className="form-control"
                    value={this.state.initialMedicationCount}
                    onChange={(e) => this.handleChange({ initialMedicationCount: e.target.value })}
                    />
                </label>
                <label htmlFor="staffId">
                  StaffId
                  <input
                    name="staffId"
                    id="staffId"
                    type="numeric"
                    className="form-control"
                    value={this.state.staffId}
                    onChange={(e) => this.handleChange({ staffId: e.target.value })}
                    />
                </label>
                <input type="submit" value="Submit Audit" onClick={(e) => this.create(e)}/>
              </form>
            </div>
          </div>
        </div>
    );
  }
}
// let domContainer = document.querySelector('#App');
// ReactDOM.render(<AuditPreview />, domContainer);

export default AddAudit;
