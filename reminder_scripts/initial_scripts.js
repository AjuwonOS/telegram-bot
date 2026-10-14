import { closeDBConnection, formattedInitialMessage, getIncompleteTodosFromPreviousDay, sendMessage, } from "../utils/functions.js";
(async () => {
    const TIME_INTERVAL = 1_000 * 15;
    let counter = 0;
    const todosFromYesterday = await getIncompleteTodosFromPreviousDay();
    const initial_notifications = setInterval(async () => {
        if (counter >= 5) {
            clearInterval(initial_notifications);
        }
        const initialMessage = formattedInitialMessage(todosFromYesterday);
        await sendMessage(initialMessage);
        counter++;
    }, TIME_INTERVAL);
    await closeDBConnection();
})();
