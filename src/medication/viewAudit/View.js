import React, { Component } from 'react';

class View extends Component{
  constructor(props){
    super(props);

    this.state ={
      audits: [],
    };
  }

    componentDidMount() {
      // get all entities - GET
      fetch("http://localhost:8080", {
    "method": "GET",
    "headers": {
      'Content-Type': 'application/json',
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

  render(){
    return(
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4 text-center">Add Audit</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
