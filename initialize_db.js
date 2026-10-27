import mysql from "mysql2/promise";
import { MYSQL_DATABASE, MYSQL_HOSTNAME, MYSQL_PASSWORD, MYSQL_USERNAME, TODO_TABLE, MESSAGES_TABLE, } from "./utils/constants.js";
export const client = mysql.createPool({
    host: MYSQL_HOSTNAME,
    database: MYSQL_DATABASE,
    password: MYSQL_PASSWORD,
    user: MYSQL_USERNAME,
});
(async () => {
    const tables = [TODO_TABLE, MESSAGES_TABLE];
    for (const table of tables) {
        await client.execute(table);
    }
    ;
})();
