import { CHAT_ID, SQL_CONSTANTS, TELEGRAM_API_ENDPOINTS } from "./constants.js";
import { client } from "../initialize_db.js";
/* BOT FUNCTIONS */
export async function sendMessage(messageText) {
    try {
        const response = await fetch(TELEGRAM_API_ENDPOINTS.sendMessage, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: messageText,
            }),
        });
        if (!response.ok)
            throw new Error(response.statusText);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("The following error occured while trying to send message to the bot using fetch api", error);
    }
}
/* SQL FUNCTIONS */
//Base SQL functions
async function execute(sql, params = []) {
    const res = await client.execute(sql, params);
    return res;
}
export async function getIncompleteTodosFromPreviousDay() {
    try {
        const [rows] = await execute(SQL_CONSTANTS.get.incompleteTodosFromPreviousDay);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}
export async function getIncompleteTodosForToday() {
    try {
        const [rows] = await execute(SQL_CONSTANTS.get.incompleteTodosForToday);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}
export async function updateIscompleteTodos(questionMarks, todosId) {
    try {
        const results = await execute(SQL_CONSTANTS.update.iscomplete + questionMarks, todosId);
        return results;
    }
    catch (error) {
        console.log(error);
    }
}
export async function getTodosById(questionMarks, todosId) {
    try {
        const [rows] = await execute(SQL_CONSTANTS.get.todosFromId + questionMarks, todosId);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}
export async function insertTodos(questionMarks, todos) {
    try {
        const result = await execute(SQL_CONSTANTS.set.todoForToday + questionMarks, todos);
        return result;
    }
    catch (error) {
        console.log(error);
    }
}
/* FORMATTED BOT TEXTS */
export function formattedInitialMessage(incompleteTodos = []) {
    let formattedText = "";
    if (incompleteTodos.length > 0) {
        formattedText = "Your incomplete todos from yesterday are:\n";
        for (let i = 0; i < incompleteTodos.length; i++) {
            formattedText += `${i + 1}. ${incompleteTodos[i]?.text}-id: ${incompleteTodos[i]?.id}.\n`;
        }
    }
    formattedText += "\nPlease make a list of todos for the day.\n";
    return formattedText;
}
//test covered
export function formattedHourlyMessage(incompleteTodosPreviousDays = [], incompleteTodosToday = []) {
    let formattedText = "";
    if (incompleteTodosPreviousDays.length > 0) {
        formattedText += "Your todos from yesterday are:\n";
        for (let i = 0; i < incompleteTodosPreviousDays.length; i++) {
            formattedText += `${i + 1}. ${incompleteTodosPreviousDays[i]?.text}-id: ${incompleteTodosPreviousDays[i]?.id}.\n`;
        }
    }
    if (incompleteTodosToday.length > 0) {
        formattedText += "\nYour incomplete todos are:\n";
        for (let i = 0; i < incompleteTodosToday.length; i++) {
            formattedText += `${i + 1}. ${incompleteTodosToday[i]?.text}-id: ${incompleteTodosToday[i]?.id}.\n`;
        }
    }
    if (incompleteTodosPreviousDays.length < 1 &&
        incompleteTodosToday.length < 1) {
        formattedText += "Well done. All todos have been completed";
    }
    return formattedText;
}
//test covered
export function responseOnCompletionOfTodo(todos = []) {
    if (todos.length < 1)
        throw new Error("Array of todos at responseOnCompletionOfTodo must not be empty");
    let responseText = "The following todos are completed:\n";
    for (let i = 0; i < todos.length; i++) {
        responseText += `${i + 1}. ${todos[i]?.text}-id: ${todos[i]?.id}\n`;
    }
    return responseText;
}
/* BOT HANDLERS */
export async function handleCompleteTodo(text) {
    const todosIdList = text.split(",").map((todo) => parseInt(todo));
    const questionMarks = createQuestionMarks(todosIdList.length);
    await updateIscompleteTodos(questionMarks, todosIdList);
    const completeTodo = await getTodosById(questionMarks, todosIdList);
    await sendMessage(responseOnCompletionOfTodo(completeTodo));
}
export async function handleShowRemainningTodos() {
    const todosFromYesterday = await getIncompleteTodosFromPreviousDay();
    const todosForToday = await getIncompleteTodosForToday();
    const hourlyMessage = formattedHourlyMessage(todosFromYesterday, todosForToday);
    await sendMessage(hourlyMessage);
}
export async function handleCreateNewTodos(newTodos) {
    const numberOfQuestionMarks = createQuestionMarksForValues(newTodos.length);
    await insertTodos(numberOfQuestionMarks, newTodos);
    await handleShowRemainningTodos();
}
/* OTHERS */
//test covered
export function createQuestionMarks(numberOfTodoStrings = 0) {
    if (numberOfTodoStrings < 1)
        throw new Error("Number of todo string must be great than 0");
    let questionMarks = "(";
    for (let i = 0; i < numberOfTodoStrings; i++) {
        questionMarks += "?,";
    }
    questionMarks = questionMarks.slice(0, -1);
    questionMarks += ")";
    return questionMarks;
}
export function createQuestionMarksForValues(number = 0) {
    if (number < 1)
        throw new Error("Number of todo string must be great than 0");
    let questionMarks = "";
    for (let i = 0; i < number; i++) {
        questionMarks += "(?),";
    }
    questionMarks = questionMarks.slice(0, -1);
    return questionMarks;
}
export async function closeDBConnection() {
    try {
        await client.end();
    }
    catch (error) {
        console.log(error);
    }
}
