'use strict';
import React, { Component, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom'


class AddAudit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audits: [],
      isMorningCount: '',
      countDoneOnDate: '',
      cyclePredictedToEndOn: '',
      count: ''
    };

    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createAudit = (auditCount) => {
    this.setState(prevState => ({
      audits: [prevState.isMorningCount, prevState.countDoneOnDate, prevState.cyclePredictedToEndOn, prevState.count]
    }));
  }
  componentDidMount() {
    // get all entities - GET
    fetch("http://localhost:8080/show", {
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "accept": "application/json"
  }
  })
  .then(response => response.json())
  .then(response => {
  this.setState({
    audits: response
  })
  })
  .catch(err => { console.log(err);
  });

  }
  create(e) {
    // add entity - POST
    fetch("http://localhost:8080/addAudit", {
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "accept": "application/json"
  },
  "body": JSON.stringify({
    isMorningCount: this.state.isMorningCount,
    countDoneOnDate: this.state.countDoneOnDate,
    cyclePredictedToEndOn: this.state.cyclePredictedToEndOn,
    count: this.state.count
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

  Reset = () =>{
    this.setState({
      audits:{}
    });
  };

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Add Audit</h1>
              <form className="d-flex flex-column">
                <legend className="text-center">Add Audit</legend>

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
                <label htmlFor="count">
                  Count:
                  <input
                    name="count"
                    id="count"
                    type="number"
                    className="form-control"
                    value={this.state.count}
                    onChange={(e) => this.handleChange({ count: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="isMorningCount">
                  Please tick for Day Count and leave blank for Evening Count:
                  <input
                    name="isMorningCount"
                    id="isMorningCount"
                    type="checkbox"
                    className="form-control"
                    value= {this.state.isMorningCount}
                    onClick={true}
                    onChange={(e) => this.handleChange({ count: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="countDoneOnDate">
                  Please enter the date of this Count :
                  <input
                    name="countDoneOnDate"
                    id="countDoneOnDate"
                    type="date"
                    className="form-control"
                    value={this.state.countDoneOnDate}
                    onChange={(e) => this.handleChange({ countDoneOnDate: e.target.value })}
                    />
                </label>
                <label htmlFor="cyclePredictedToEndOn">
                  This Cycle is predicted to end on:
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
