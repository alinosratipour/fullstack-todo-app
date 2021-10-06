const Pool = require("pg").Pool;


const pool = new Pool({
//user:"postgres",
//password:"postgres",
connectionString:process.env.DATABASE_URL,
ssl:true
//port:5432,
//database: "perntodo"

// Host: "ec2-63-33-239-176.eu-west-1.compute.amazonaws.com",
// Database :"d1oevm58crujbi",
// User: "xpfgznoloeuavw",
// Port:5432,
// Password:"0f4979ad807f4d4cf1fb18979bbfec54573146104d875e636ccc9e2b19205f64",

// URI:"postgres://xpfgznoloeuavw:0f4979ad807f4d4cf1fb18979bbfec54573146104d875e636ccc9e2b19205f64@ec2-63-33-239-176.eu-west-1.compute.amazonaws.com:5432/d1oevm58crujbi",
// Heroku CLI :"heroku pg:psql postgresql-reticulated-80765 --app parsa-todo-app"


});

module.exports = pool;