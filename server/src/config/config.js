require('dotenv').config();

const config = {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'password',
    database: process.env.MYSQLDATABASE || 'myjobs',
    host: process.env.MYSQLHOST || 'db',
    port: process.env.MYSQLPORT || '3306',
    dialect: 'mysql',
};

module.exports = {
    development: config,
    test: config,
    production: config,
};
