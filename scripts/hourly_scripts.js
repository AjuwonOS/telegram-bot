import { closeDBConnection, formattedHourlyMessage, getIncompleteTodosForToday, getIncompleteTodosFromPreviousDay, insertMessage, sendMessage, } from "../utils/functions.js";
(async () => {
    const todosFromYesterday = await getIncompleteTodosFromPreviousDay();
    const todosForToday = await getIncompleteTodosForToday();
    const hourlyMessage = formattedHourlyMessage(todosFromYesterday, todosForToday);
    if (hourlyMessage === "Well done. All todos have been completed") {
        closeDBConnection();
        process.exit(0);
    }
    const res = await sendMessage(hourlyMessage);
    if (res)
        await insertMessage(res.result.message_id, true, hourlyMessage);
    await closeDBConnection();
})();
