export const convertToYYYYMMDD  = timestamp => {
    let date = new Date(timestamp);
    let day = date.getDate().toString().padStart(2, "0"); //ensuring there's a leading 0
    let month = (date.getMonth()+1).toString().padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
}
