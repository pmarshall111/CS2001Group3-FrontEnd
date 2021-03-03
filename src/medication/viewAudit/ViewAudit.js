import React, { Component, useEffect } from 'react'
import { render } from 'react-dom'
import axios from 'axios';
import './ViewAudit.css'
import Loader from 'react-loader-spinner';

export default function ViewAudit() {
  const [data, updateData] = React.useState([]);

  let isLoading = true;

  useEffect(()=>{
    axios({
      method: 'get',
      url: '/Audit',
    }).then(res=>{
      console.log(res);
      updateData(res.data)
    });
  },[]);

  if (data.length > 0) isLoading = false;

  return (
    <div className="container">
      {isLoading ? (
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      ) : (
          <table className="table" aria-label="Table">
            <thead>
              <tr>
                <th>Patient Audits</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(row => (
                <tr key={row.id}>
                  <td align="left">{row.name}</td>
                  <td align="left">{row.staffId}</td>
                  <td align="left">{row.dayCount}</td>
                  <td align="left">{row.eveningCount}</td>
                  <td align="left">{row.initialMedicationCount}</td>
                  <td align="left">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
    </div>
  );
}
