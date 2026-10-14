import mysql from "mysql2/promise";
import { MYSQL_DATABASE, MYSQL_HOSTNAME, MYSQL_PASSWORD, MYSQL_USERNAME, TODO_TABLE, } from "./utils/constants.js";
export const client = mysql.createPool({
    host: MYSQL_HOSTNAME,
    database: MYSQL_DATABASE,
    password: MYSQL_PASSWORD,
    user: MYSQL_USERNAME
});
(async () => await client.execute(TODO_TABLE))();
