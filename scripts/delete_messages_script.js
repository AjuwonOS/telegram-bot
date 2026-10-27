import { closeDBConnection, deletMessages } from "../utils/functions.js";
(async () => {
    await deletMessages();
    await closeDBConnection();
})();
