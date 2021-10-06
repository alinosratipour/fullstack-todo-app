const dotenv = require('dotenv') ;
dotenv.config();
const Pool = require("pg").Pool;

const dbUrl = process.env.DATABASE_URL;


export const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});

module.exports = pool;