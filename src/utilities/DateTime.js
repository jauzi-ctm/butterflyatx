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

// format in: "MM/DD/YYYY"
function toDateObject(format) {
    let args = format.split("/");
    let month = parseInt(args[0]) - 1;
    let day = parseInt(args[1]);
    let year = parseInt(args[2]);

    return new Date(year, month, day);
}

function isPast(date) {
    let current = new Date();

    if (date.getFullYear() < current.getFullYear()) {
        return true;
    }

    if (date.getMonth() < current.getMonth()) {
        return true;
    }

    return date.getDate() < current.getDate();
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

export { DateTime, toDateObject, isPast };