const { Pool } = require("pg");

const connect = new Pool({
    host:"localhost",
    user:"postgres",
    password:"admin",
    database:"Eccomerce",
    port:"5432"
});

module.exports=connect