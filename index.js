require('dotenv').config()

const mysql = require('mysql2/promise')

main().catch((v) => console.error(v));

async function main() {
  // Create the connection to the database
  const connection = await mysql.createConnection(process.env.DATABASE_URL)
  
  // simple query
  const [results, fields] = await connection.query('show tables');
  console.log(results) // results contains rows returned by server
  console.log(fields) // fields contains extra metadata about results, if available
  
  // Example with placeholders
  const results2 = await connection.query('select 1 from dual where ? = ?', [1, 1]);
  console.log(results2)
  
  await connection.end()
}
