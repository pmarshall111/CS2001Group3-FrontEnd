export const dateIsYesterdayOrEarlier = (targetDate) => {
    let today = new Date();
    return new Date(targetDate.toDateString()) < new Date(today.toDateString());
}