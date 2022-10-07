import { createPool } from "mysql2/promise";

const {HOST, USER, PASSWORD, PORT, DATABASE} = process.env

const pool = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  port: PORT,
  database: DATABASE,
});

export { pool };
