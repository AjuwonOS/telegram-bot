import { closeDBConnection, formattedInitialMessage, getIncompleteTodosForToday, getIncompleteTodosFromPreviousDay, insertMessage, sendMessage, } from "../utils/functions.js";
(async () => {
    const todosFromYesterday = await getIncompleteTodosFromPreviousDay();
    const todosForToday = await getIncompleteTodosForToday();
    if (todosForToday && todosForToday.length > 0) {
        await closeDBConnection();
        return;
    }
    const initialMessage = formattedInitialMessage(todosFromYesterday);
    const res = await sendMessage(initialMessage);
    if (res)
        await insertMessage(res.result.message_id, true, initialMessage);
    await closeDBConnection();
})();
