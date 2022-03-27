const moment = require('moment');
module.exports = {
    currentDate: () => {
        const timeObject = moment().add(-5, 'hour').format('YYYY-MM-DD');
        return timeObject;
    },
    substractSevenDays: () => {
        return moment().subtract(7, "days").format("YYYY-MM-DD");
    }
}