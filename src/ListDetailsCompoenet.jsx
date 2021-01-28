import React, {Component} from "react";
import MedicationDetailsService from "./MedicationsDetails";
class ListDetailsComponent extends Component {
    constructor() {
        super();
        this.state = {
            medication:[]
        }

    }

componentDidMount(){
    MedicationDetailsService.getDetails().then((res)=>
        {
            this.setState({medication: res.data});
        }
    );
}

    render() {
        return(
            <div>
                <h2 className = "text-center">Medication Detail</h2>

                <div className = "row"> 
                    <table className = "table table-strped table-bordered">
                        <tbody>
                          <tr>
                              <th>Description</th>
                                <th>Dosage</th>
                                <th>Medication Class</th>
                                <th>Medication Name</th>
                                <th>Pharmacy Name</th>
                                <th>Count</th>
                          </tr>
                        </tbody>

                        <tbody>

                            {
                                this.state.medication.map(
                                    medication=>
                                    <tr key= {medication.id}>
                                        <td>{medication.medicationDescription}</td>
                                         <td>{medication.dosage}</td>
                                         <td>{medication.medicationClass}</td>
                                        <td>{medication.medicationName}</td>
                                        <td>{medication.pharmacyName}</td>
                                        <td>{medication.prescriptionCount}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
 
export default ListDetailsComponent;