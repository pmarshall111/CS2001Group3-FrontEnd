import React from 'react';
import "./style.css";

function MedicationDetailsPage (props) {
  return (
          <div>
            <div className = "middle">
            <h3 >Medication: {props.med} </h3>
            <h3>Resident: {props.res}</h3>
           

           
            <select className = "options">
              <option value={props.phar1}>278 Pharmacy</option>
              <option value="Drug Loft">{props.phar2}</option>
              <option value ="Alpina Pharmacy INC">{props.phar3}</option>
              <option value="90th Street Pharmacy">{props.phar4}</option>
             </select>
              </div>
         </div>

  )
}




export default MedicationDetailsPage;


