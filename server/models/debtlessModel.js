const { Pool } = require('pg');
const PG_URI = 'postgres://cdtsufqu:KrK8Hyu93UEo1ULxk0DiJbNj7QPQDIdV@lallah.db.elephantsql.com/cdtsufqu';

const pool = new Pool({
  connectionString: PG_URI,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}
