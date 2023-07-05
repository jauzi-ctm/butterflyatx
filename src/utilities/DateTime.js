const parseDate = (date) => {
    if (date == null) {
        return null;
    }

    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const parseTime = (date) => {
    if (date == null) {
        return null;
    }

    let hour = date.getHours();
    let isAM = true;

    if (hour > 12) {
        hour -= 12;
        isAM = false;
    }

    if (hour == 0) {
        hour = 12;
    }

    if (hour == 12) {
        isAM = false;
    }

    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${hour}:${minutes}${isAM ? "am" : "pm"}`;
}

class DateTime {

    constructor(type) {
        this.dateObject = new Date();
        this.isInitialized = false;
        this.isDate = type == "DatePicker";
    }

    set(newDate) {
        this.dateObject = newDate;
        this.isInitialized = true;
    }

    toString() {
        if (!this.isInitialized) {
            return "";
        }

        if (this.isDate) {
            return parseDate(this.dateObject);
        }

        return parseTime(this.dateObject);
    }

}

export { DateTime };