const { Pool } = require('pg');
require('dotenv').config(); // to access the PG_URI env var

// development
// const myURI = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PG_PORT}/${process.env.DATABASE}`;
// console.log(myURI);

//Object with connectionString to our postgresURL
const pool = new Pool({
  connectionString: process.env.PG_URI
  // connectionString: myURI
});

//Export object with query method
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed the following query:', text);
    return pool.query(text, params, callback);
  }
};
