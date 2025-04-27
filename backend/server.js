require('dotenv').config();
const app = require('./app');
const db = require('./config/db');

const port = process.env.PORT || 3000;

db.query('SELECT NOW()', (err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})