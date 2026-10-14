import { closeDBConnection, formattedHourlyMessage, getIncompleteTodosForToday, getIncompleteTodosFromPreviousDay, sendMessage } from "../utils/functions.js";
(async () => {
    const todosFromYesterday = await getIncompleteTodosFromPreviousDay();
    const todosForToday = await getIncompleteTodosForToday();
    const hourlyMessage = formattedHourlyMessage(todosFromYesterday, todosForToday);
    if (!hourlyMessage) {
        closeDBConnection();
        process.exit(0);
    }
    await sendMessage(hourlyMessage);
    await closeDBConnection();
})();
