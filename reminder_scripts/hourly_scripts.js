import { closeDBConnection, formattedHourlyMessage, getIncompleteTodosForToday, getIncompleteTodosFromPreviousDay, sendMessage } from "../utils/functions.js";
const todosFromYesterday = await getIncompleteTodosFromPreviousDay();
const todosForToday = await getIncompleteTodosForToday();
const hourlyMessage = formattedHourlyMessage(todosFromYesterday, todosForToday);
await sendMessage(hourlyMessage);
await closeDBConnection();
