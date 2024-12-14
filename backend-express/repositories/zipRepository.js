const connection = require('../db');

const countAllZips = async function () {
    return connection.query(`SELECT COUNT(*) AS total
                             FROM zips`)[0].total;
};

module.exports = {
    countAllZips,
};