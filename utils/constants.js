//import dotenv from "dotenv";
//dotenv.config()
/* ENV CONSTANTS */
export const TOKEN = process.env.TOKEN;
export const CHAT_ID = process.env.CHAT_ID;
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
export const MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
/* SQL CONSTANTS */
export const TODO_TABLE = `
    CREATE TABLE IF NOT EXISTS todo (
        id INT AUTO_INCREMENT,
        text TEXT NOT NULL,
        date DATE DEFAULT (CURRENT_DATE),
        iscomplete BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (id)
    );
`;
/* TELEGRAM BASE-URL */
export const TELEGRAM_BASE_URL = `https://api.telegram.org/bot${TOKEN}`;
/* API END-POINTS */
export const TELEGRAM_API_ENDPOINTS = {
    sendMessage: `${TELEGRAM_BASE_URL}/sendMessage`,
    setWebhook: `${TELEGRAM_BASE_URL}/setWebHook`,
    delete: `${TELEGRAM_BASE_URL}/deleteWebhook`
};
/*  */
const today = new Date();
const todaysDate = today.toISOString().split("T")[0];
/* SQL CONSTANTS */
export const SQL_CONSTANTS = {
    set: {},
    get: {
        incompleteTodosFromPreviousDay: `SELECT text, id FROM todo WHERE iscomplete = 0 AND date < "${todaysDate}"`, //`
        incompleteTodosForToday: `SELECT text, id FROM todo WHERE iscomplete = 0 AND date = "${todaysDate}"`,
        todosFromId: `SELECT text, id FROM todo WHERE id IN `
    },
    update: { iscomplete: `UPDATE todo SET iscomplete = 1 WHERE id IN ` },
};
