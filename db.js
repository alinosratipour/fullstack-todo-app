const Pool = require("pg").Pool;
require("dotenv").config();
//left test comment
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
   const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    //below line ssl need to be commented out when running locally
    
    ssl: {
        rejectUnauthorized: false,
    },
});     
   

module.exports = pool;