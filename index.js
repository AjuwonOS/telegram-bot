import express, { json } from "express";
import { handleCompleteTodo, handleCreateNewTodos, handleShowRemainningTodos, insertMessage } from "./utils/functions.js";
const app = express();
app.use(json());
app.get("/", (req, res) => res
    .status(200)
    .send({ message: "Welcome to Ajuwon's telegram Bot", success: true }));
app.post("/", async (req, res) => {
    try {
        if (!req.body.message)
            return res
                .status(200)
                .send({ message: "Request is not a new text.", success: true });
        const { message: { text, message_id }, } = req.body;
        await insertMessage(message_id, false, text);
        const command = text.split("\n")[0];
        if (command === "/Done" && text.split("\n").length > 1) {
            const completedText = text.split("\n")[1];
            handleCompleteTodo(completedText);
            return res
                .status(200)
                .send({ message: "Text received successfully.", success: true });
        }
        if (command === "/Remaining") {
            handleShowRemainningTodos();
            return res
                .status(200)
                .send({ message: "Text received successfully.", success: true });
        }
        if (command === "/Add") {
            const newTodos = text.split("\n").slice(1);
            await handleCreateNewTodos(newTodos);
            return res
                .status(200)
                .send({ message: "New todos added successfully", success: true });
        }
        return res.status(200).send({ message: "Unknown", success: false });
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(3000, () => console.log("Running on port 3000"));
