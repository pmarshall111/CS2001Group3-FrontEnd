import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Audit.css';

class Audit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', dayCount: '', eveningCount: '', staffId: '',
    initialMedicationCount: '', date: ''};
  }

  inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    alert(`You've successfully submitted: ${this.state.dayCount} Day Count /
    ${this.state.eveningCount} Evening Count`);
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label class="input-group-text">Resident Name </label>
        <input class="form-control form-control-lg" placeholder="enter resident name"
        type ="text" name="name" onChange={this.inputChanged}
        value={this.state.firstName}/><br/>

        <label class="input-group-text">Day Count </label>
        <input class="form-control form-control-lg" placeholder="enter medication intake"
        type ="number" name="dayCount" onChange={this.inputChanged}
        value={this.state.dayCount}/><br/>

        <label class="input-group-text">Evening Count </label>
        <input class="form-control form-control-lg" placeholder="enter medication intake"
        type ="number" name="eveningCount" onChange={this.inputChanged}
        value={this.state.eveningCount}/><br/>

        <label class="input-group-text">Initial Medication Count </label>
        <input class="form-control form-control-lg" placeholder="enter intial prescription count"
        type ="number" name="initialMedicationCount" onChange={this.inputChanged}
        value={this.state.initialMedicationCount}/><br/>

        <label class="input-group-text">Staff Id </label>
        <input class="form-control form-control-lg" placeholder="enter staff ID"
        type ="text" name="staffId" onChange={this.inputChanged}
          value={this.state.staffId}/><br/>

        <label class="input-group-text">Date </label>
        <input class="form-control form-control-lg" placeholder="enter date"
        type ="date" name="date" onChange={this.inputChanged}
          value={this.state.date}/><br/>
          
        <input type="submit" value="Submit Audit"/>
      </form>
    );
  }
}

export default Audit;
