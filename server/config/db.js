import {Pool} from 'pg'

const con = new Pool({
  user: "postgres",
  password: "PrathameshC",
  host: "localhost",
  port: 5432,
  database: "store_rating_system"
});

export default con;