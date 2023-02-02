const logger = require('../resources/logging.js');
const dbApi = require('../db_apis/dbApi.js');

async function calculateAge(req, res, next) {
    try {
        await dbApi.addDOBtoDatbase(req);
        const dateString = req.body.dob;
        console.log(dateString);
        const now = new Date();

        const yearNow = now.getFullYear();
        const monthNow = now.getMonth();
        const dateNow = now.getDate();

        const dob = new Date(dateString);
        console.log(dob);
        const yearDob = dob.getFullYear();
        const monthDob = dob.getMonth();
        const dateDob = dob.getDate();

        let yearAge = yearNow - yearDob;
        let monthAge;

        if (monthNow >= monthDob) {
            monthAge = monthNow - monthDob;
        } else {
            yearAge--;
            monthAge = 12 + monthNow - monthDob;
        }

        let dateAge;
        if (dateNow >= dateDob) {
            dateAge = dateNow - dateDob;
        } else {
            monthAge--;
            dateAge = 31 + dateNow - dateDob;

            if (monthAge < 0) {
                monthAge = 11;
                yearAge--;
            }
        }

        const age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
        };

        const yearString = (age.years > 1) ? "years" : "year";
        const monthString = (age.months > 1) ? " months" : " month";
        const dayString = (age.days > 1) ? " days" : " day";

        let ageString = "";

        if ((age.years > 0) && (age.months > 0) && (age.days > 0)) {
            ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " old.";
        } else if ((age.years === 0) && (age.months === 0) && (age.days > 0)) {
            ageString = "Only " + age.days + dayString + " old!";
        } else if ((age.years > 0) && (age.months === 0) && (age.days === 0)) {
            ageString = age.years + yearString + " old. Happy Birthday!!";
        } else if ((age.years > 0) && (age.months > 0) && (age.days === 0)) {
            ageString = age.years + yearString + " and " + age.months + monthString + " old.";
        } else if ((age.years === 0) && (age.months > 0) && (age.days > 0)) {
            ageString = age.months + monthString + " and " + age.days + dayString + " old.";
        } else if ((age.years > 0) && (age.months === 0) && (age.days > 0)) {
            ageString = age.years + yearString + " and " + age.days + dayString + " old.";
        } else if ((age.years === 0) && (age.months > 0) && (age.days === 0)) {
            ageString = age.months + monthString + " old.";
        } else {
            ageString = "Oops! Could not calculate age!";
        }
        console.log(ageString);
        res.status(200).json(ageString);
    } catch (err) {
        logger.logger.error(`error occurred while calculating age: ${err}`);
        res.status(500).json(err);
    }
}

async function getRequestorsCount(req, res, next) {
    await dbApi.getRequestorsCount(req, res);
}

module.exports = { calculateAge, getRequestorsCount }
