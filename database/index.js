const { Pool } = require("pg");

// const connect = new Pool({
//     host:"localhost",
//     user:"postgres",
//     password:"admin",
//     database:"Eccomerce",
//     port:"5432"
// });
const connect = new Pool({
    host:"heffalump.db.elephantsql.com",
    user:"exjisevz",
    password:"TZFLeF7R2KbokD-cSav7vPGz4J7zyyWK",
    database:"exjisevz",
    port:"5432"
});
module.exports=connect