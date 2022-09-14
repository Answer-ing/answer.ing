const { Pool } = require('pg');
require('dotenv').config(); // to access the PG_URI env var

//Object with connectionString to our postgresURL
const pool = new Pool({
  connectionString: process.env.PG_URI
});

//Export object with query method
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed the following query:', text);
    return pool.query(text, params, callback);
  }
};
