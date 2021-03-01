
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import './ViewAudit.css' ;

import "react-datepicker/dist/react-datepicker.css";

class View extends React.Component{
  constructor(props){
    super(props);

    this.state ={
      audits: []
      // isMorningCount: '',
      // countDoneOnDate: '',
      // cyclePredictedToEndOn: '',
      // count: ''
    };

//     const PickDay = () => {
//       const [startDate, setStartDate] = useState(new Date());
//       return (
//         <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
//   );
// };
  }

    componentDidMount() {
      // get all entities - GET
      fetch('http://localhost:8080/show?medCountId={this.props.medCountId}', {
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
  .catch(error => { console.log(error);
  });

    }

    // renderTableData(){
    //   return this.state.audits.map((audit, index) =>{
    //     const {medCountId, count, countDoneOnDate, cyclePredictedToEndOn, isMorningCount,medForResId} = audit
    //     return(
    //       <tr key={this.medCountId}>
    //         <td>{this.medCountId}</td>
    //         <td>{this.count}</td>
    //         <td>{this.countDoneOnDate}</td>
    //         <td>{this.cyclePredictedToEndOn}</td>
    //         <td>{this.isMorningCount}</td>
    //         <td>{this.medForResId}</td>
    //       </tr>
    //     )
    //   })
    // }


  render(){
    return(
      <div className="container"id ="main">
        <div className="row justify-content-center" id ="main2">

            <h1 className="display-4 text-center">View Historic Audit</h1>
            <input placeholder="Selected date" type="date" id="date-picker-example" class="form-control datepicker"></input>

            <DatePicker type="date" id="date-pick"
            selected={this.date}
            onSelect={this.handleDateSelect} //when day is clicked
            onChange={this.handleDateChange} //only when value has changed
            ></DatePicker>

            <Table
            data-toggle = "table"
            data-url="http://localhost:8080/show?medCountId={this.props.medCountId}"
            data-search ="true"
            data-pagination = "true"
            responsive>
              <thead>
                <tr>
                  <th>#</th>
                    <th data-field="name"> Patient Name </th>
                    <th data-field="name"> Medication </th>
                    <th data-field="date"data-sortable ="true"> Date Recorded </th>
                    <th data-field="number"> Day Count </th>
                    <th data-field="number"> Evening Count </th>
                    <th data-field="number"> Total Count </th>
                    <th data-field="name"> Staff Name </th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>{this.medCountId}</td>
                <td>{this.count}</td>
                <td>{this.countDoneOnDate}</td>
                <td>{this.cyclePredictedToEndOn}</td>
                <td>{this.isMorningCount}</td>
                <td>{this.medForResId}</td>
              </tr>
              </tbody>

            </Table>

        </div>
      </div>
    );
  }

}

export default View;
