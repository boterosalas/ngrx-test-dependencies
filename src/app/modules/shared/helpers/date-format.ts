export class DateFormat {
    static format(date: any, format: string) {
        date = new Date(date);
        if (DateFormat.isValidDate(date)) {
            const year = date.getFullYear();
            const month = `0${date.getMonth() + 1}`;
            const day = date.getDate();
            switch (format) {
                case 'YYYY-MM-DD':
                    return `${year}-${month.substring(month.length - 2)}-${day}`;
                case 'YYYY-MM-DD HH:MM A':
                    return `${year}-${month.substring(month.length - 2)}-${day} ${DateFormat.timeFormat(date, true)}`;
                case 'YYYY-MM-DD HH:MM':
                    return `${year}-${month.substring(month.length - 2)}-${day} ${DateFormat.timeFormat(date, false)}`;
            }
        } else {
            return '';
        }
    }

    static joinDateAndHour(date, time) {
        date = new Date(date);
        if (DateFormat.isValidDate(date)) {
            const year = date.getFullYear();
            const month = `0${date.getMonth() + 1}`;
            const day = `0${date.getDate()}`;
            return `${year}-${month.substring(month.length - 2)}-${day.substring(day.length - 2)} ${time}`
        }
        else {
            return '';
        }
    }

    static timeFormat(date: any, am: boolean = true) {
        date = new Date(date);
        if (DateFormat.isValidDate(date)) {
            const hour = `0${date.getHours()}`;
            const minute = `0${date.getMinutes()}`;
            if (am) {
                if (parseInt(hour) >= 12) {
                    return `${parseInt(hour) === 12 ? hour.substring(hour.length - 2) : parseInt(hour) - 12}:${minute.substring(minute.length - 2)} PM`;
                } else {
                    return `${hour.substring(hour.length - 2)}:${minute.substring(minute.length - 2)} AM`;
                }
            } else {
                return `${hour.substring(hour.length - 2)}:${minute.substring(minute.length - 2)}`;
            }
        }
        else {
            return '';
        }
    }

    static isValidDate(date: any) {
        return date instanceof Date && !isNaN(date as any);
    }

    static alwaysTwoDigits(){

    }
}