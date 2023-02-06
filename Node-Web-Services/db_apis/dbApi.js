const uuid = require('uuid');
const mysql = require("mysql");

const { logger } = require('../resources/logging.js');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3300, //change port
    database: 'calculateageDB' //change DB name
})

connection.connect(error => {
    if (error)
        throw error
    console.log("Connected to database");
})

async function addDOBtoDatbase(req) {
    const sql = `INSERT INTO EMP_DOB_AGE (Request_ID, DATE_OF_BIRTH, CREATE_TMST)
    VALUES (${uuid.v4}, ${req.body.dob}, CURRENT_TIMESTAMP())`
    connection.query(sql, error => {
        if (error)
            throw error
        res.send("Success")
    })
    logger.logger.error(`Record Saved Successfully`);
}

async function getRequestorsCount(req, res) {
    const sql = `SELECT COUNT(Request_ID) FROM EMP_DOB_AGE`
    connection.query(sql, (error, data) => {
        if (error)
            throw error
        res.json(data)
    })
}

module.exports = { addDOBtoDatbase, getRequestorsCount }
