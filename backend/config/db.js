
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'feedback_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

function query(text, params) {
    return pool.query(text, params);
}

function getPool() {
    return pool;
}

module.exports = {
    query,
    getPool,
};
