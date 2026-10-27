//import dotenv from "dotenv";
//dotenv.config()
/* ENV CONSTANTS */
export const TOKEN = process.env.TOKEN;
export const CHAT_ID = process.env.CHAT_ID;
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
export const MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
export const TESTING_URL = process.env.TESTING_URL;
export const LIVE_URL = process.env.LIVE_URL;
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
export const MESSAGES_TABLE = `
    CREATE TABLE IF NOT EXISTS message (
      id INT NOT NULL,
      text TEXT NOT NULL,
      isbot BOOLEAN NOT NULL,
      date DATE DEFAULT (CURRENT_DATE),
      PRIMARY KEY (id)
    );
`;
/* TELEGRAM BASE-URL */
export const TELEGRAM_BASE_URL = `https://api.telegram.org/bot${TOKEN}`;
/* API END-POINTS */
export const TELEGRAM_API_ENDPOINTS = {
    sendMessage: `${TELEGRAM_BASE_URL}/sendMessage`,
    setWebhook: `${TELEGRAM_BASE_URL}/setWebHook`,
    deleteWebhook: `${TELEGRAM_BASE_URL}/deleteWebhook`,
    deleteMessages: `${TELEGRAM_BASE_URL}/deleteMessages`
};
/*  */
const today = new Date();
const todaysDate = today.toISOString().split("T")[0];
/* SQL CONSTANTS */
export const SQL_CONSTANTS = {
    set: {
        todoForToday: `INSERT INTO todo(text) VALUE `,
        message: `INSERT INTO message(id, isbot, text) VALUE (?, ?, ?)`
    },
    get: {
        incompleteTodosFromPreviousDay: `SELECT text, id FROM todo WHERE iscomplete = FALSE AND date < "${todaysDate}"`, //`
        incompleteTodosForToday: `SELECT text, id FROM todo WHERE iscomplete = FALSE AND date = "${todaysDate}"`,
        todosFromId: `SELECT text, id FROM todo WHERE id IN `,
        messageId: `SELECT id FROM message WHERE date = "${todaysDate}"`,
        allTodos: `SELECT text FROM todo` // in the future you can refine this to get todos by date, so we can have a kind of history functionality
    },
    update: { iscomplete: `UPDATE todo SET iscomplete = TRUE WHERE id IN ` },
};
