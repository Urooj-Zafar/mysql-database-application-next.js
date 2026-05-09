import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SE4DBS",
  database: "ecommerce"
});

console.log("MySQL Connected");

export { db };