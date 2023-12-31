require('dotenv').config()

const mysql = require('mysql2/promise')

main().catch((v) => console.error(v));

async function main() {
  // Create the connection to the database
  const db = await mysql.createConnection(process.env.DATABASE_URL)

  // "results" contains rows returned by server
  // "fields" contains extra metadata about results, if available
  const [showTablesResult, showTablesFields] = await db.query('show tables');
  console.log('show tables', { result: showTablesResult, fields: showTablesFields });

  // if (showTablesResult.some((v) => v.Tables_in_test === 'try-planetscale')) {
  //   const [result, fields] = await db.query('drop table `try-planetscale`');
  //   console.log('drop table', { result, fields });
  // }

  // const [result, fields] = await db.query('create table `try-planetscale` (id varchar(255), name varchar(255))');
  // console.log('create table', { result, fields });

  const now = Date.now();
  const id = String(now);
  const name = new Date(now).toLocaleString();

  const [insertResult, insertFields] = await db.query('insert into `try-planetscale` (id, name) values (?, ?)', [id, name]);
  console.log('insert', { result: insertResult, fields: insertFields });

  const [selectResults, selectFields] = await db.query('select * from `try-planetscale`');
  console.log('select all', { result: selectResults, fields: selectFields });

  // Example with placeholders
  const [select2Results, select2Fields] = await db.query('select * from `try-planetscale` where id = ?', [id]);
  console.log('select by ID', { id, result: select2Results, fields: select2Fields });

  await db.end()
}
