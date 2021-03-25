export const dateIsYesterdayOrEarlier = (targetDate) => {
    let today = new Date();
    return new Date(targetDate.toDateString()) < new Date(today.toDateString());
}

export const roundDateToNearestMins = (inDate, mins) => {
    let outDate = new Date(inDate);
    let roundedMins = (Math.round(inDate.getMinutes()/mins) * mins) % 60;
    outDate.setMinutes(roundedMins,0,0);
    return outDate;
}

export const datesAreSameDay = (thisDate, thatDate) => {
    return (thisDate.getFullYear() === thatDate.getFullYear()) &&
        (thisDate.getMonth() === thatDate.getMonth()) &&
        (thisDate.getDate() === thatDate.getDate());
}

export const dateDiff = (first,second) => {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second-first)/(1000*60*60*24));
}