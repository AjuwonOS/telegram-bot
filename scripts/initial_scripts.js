import { closeDBConnection, formattedInitialMessage, getIncompleteTodosForToday, getIncompleteTodosFromPreviousDay, sendMessage, } from "../utils/functions.js";
(async () => {
    const todosFromYesterday = await getIncompleteTodosFromPreviousDay();
    const todosForToday = await getIncompleteTodosForToday();
    if (todosForToday && todosForToday.length > 0) {
        await closeDBConnection();
        return;
    }
    const initialMessage = formattedInitialMessage(todosFromYesterday);
    await sendMessage(initialMessage);
    await closeDBConnection();
})();
