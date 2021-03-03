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