import React, {useState} from 'react';
import {FormControl, FormLabel} from "react-bootstrap";

import "./MedicationDose.css"
import Button from "react-bootstrap/Button";
import DateTimePicker from "react-datetime-picker";

const MedicationDose = (props) => {
    const {time, repeats, dose, doseTimes, setDoseTimes, idx} = props;

    const repeatOptions = ["Every day", "Every 2 days", "Every 3 days", "Every week"].map(x => <option value={x} key={x}>{x}</option>)
    const times = createTimes().map(x => <option value={x} key={x}>{x}</option>);


    return (
        <div className={"dose-container"} key={idx}>
            <div className={"close-btn-container"}>
                <Button variant={"light"} onClick={e => {e.preventDefault(); setDoseTimes(doseTimes.slice(0,idx).concat(doseTimes.slice(idx+1)))}}>X</Button>
            </div>
            <FormLabel>Time: </FormLabel>
            <DateTimePicker
                onChange={e =>
                    setDoseTimes([].concat(doseTimes.slice(0,idx)).concat({time: e, repeats, dose}).concat(doseTimes.slice(idx+1)))}
                value={time}
            />
            <FormLabel>Dose: </FormLabel>
            <FormControl type={"text"} value={dose} onChange={e => {
                setDoseTimes([].concat(doseTimes.slice(0,idx)).concat({time, repeats, dose: e.target.value}).concat(doseTimes.slice(idx+1)))
            }} />
            <FormLabel>Repeats: </FormLabel>
            <FormControl as={"select"} value={repeats} onChange={e => {
                setDoseTimes([].concat(doseTimes.slice(0,idx)).concat({time, repeats: e.target.value, dose}).concat(doseTimes.slice(idx+1)))
            }}>
                {repeatOptions}
            </FormControl>
        </div>
    );
}

const createTimes = () => {
    const allTimes = [];
    let hour = 0, minute = 0;
    while (hour < 24) {
        minute = 0
        while (minute < 60) {
            allTimes.push(hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0"))
            minute += 30;
        }
        hour++;
    }
    return allTimes;
}

//would be used with createTimes func if we were just accepting the time that the medication would be taken.
// <FormControl default={"00:00"} as={"select"} value={time} onChange={e => {
//     setDoseTimes([].concat(doseTimes.slice(0,idx)).concat({time: e.target.value, repeats, dose}).concat(doseTimes.slice(idx+1)));
// }}>
//     {times}
// </FormControl>

export default MedicationDose;