const config = require('../utils/config')
const Pool = require('pg').Pool

const pool = new Pool({
    user: config.pgUser,
    host: config.pgHost,
    database: config.pgDatabase,
    password: config.pgPassword,
    port: config.pgPort
})

module.exports = pool