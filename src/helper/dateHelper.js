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