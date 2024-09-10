import { assert } from "$std/assert/assert.ts";
import { tool } from "@langchain/core/tools";
import { z } from "npm:zod";
import { resetHistory } from "../../data/history.ts";
import {
    addTodo,
    deleteTodo,
    getTodo,
    getTodoList,
    updateTodo,
} from "../../data/todo.ts";

// I- Calculator
const calculatorSchema = z.object({
    operation: z.enum(["add", "subtract", "multiply", "divide"]).describe(
        "Type of operations the calculator can do",
    ),
    number1: z.number().describe("First number"),
    number2: z.number().describe("First number"),
});

export const calculatorTool = tool(({ operation, number1, number2 }) => {
    if (operation === "add") {
        return `${number1 + number2}`;
    } else if (operation === "subtract") {
        return `${number1 - number2}`;
    } else if (operation === "multiply") {
        return `${number1 * number2}`;
    } else if (operation === "divide") {
        return `${number1 / number2}`;
    } else {
        throw new Error("Invalid operation.");
    }
}, {
    name: "calculator",
    description: "Calculator tool to perform mathematical operations",
    schema: calculatorSchema,
});

// II- Todo CRUD
const todoSchema = z.object({
    action: z.enum(["list", "view", "delete", "edit", "create"]).describe(
        "Type of action to perform on a todo. Use the id parameter for view, edit, and delete actions.",
    ),
    id: z.string().optional().describe(
        "ID of the todo. Not the title. The todo object will have the id parameter. Use this for View, Edit, and Delete. ",
    ),
    todoData: z.object({
        title: z.string().describe("Title of the todo"),
        completed: z.boolean().describe("Status of the todo"),
    }).optional().describe("Data of the todo. Use for Create and Edit."),
});

export const todoTool = tool(async ({ action, id, todoData }) => {
    console.log("Called todo tool with", { action, id, todoData });
    if (action === "list") {
        return ["List of all the todos", await getTodoList()];
    } else if (action === "view") {
        assert(id, "ID is required for view action");
        return [`The requested todo for ${id}`, await getTodo(id)];
    } else if (action === "delete") {
        assert(id, "ID is required for delete action");
        return ["Successfully deleted", await deleteTodo(id)];
    } else if (action === "edit") {
        assert(id, "ID is required for edit action");
        assert(todoData, "Todo data is required for edit action");

        return ["Successfully edited", await updateTodo({ id, ...todoData })];
    } else if (action === "create") {
        assert(todoData, "Todo data is required for edit action");
        return [
            "Successfully created",
            await addTodo({ ...todoData, id: Math.random().toString() }),
        ];
    } else {
        throw new Error("Invalid action.");
    }
}, {
    name: "todo",
    description:
        "Todo tool to manage todo list. Supports list all todos, view todo, and delete todo",
    schema: todoSchema,
});

// III- Reset Chat
const resetChatSchema = z.object({
    action: z.enum(["reset"]).describe("Action to reset the chat history"),
});

export const resetChatTool = tool(async ({ action }) => {
    if (action === "reset") {
        // Reset the chat history
        await resetHistory();
        return "Chat history reset successfully";
    } else {
        throw new Error("Invalid action.");
    }
}, {
    name: "resetChat",
    description: "Reset chat history",
    schema: resetChatSchema,
});

export const Tools = [calculatorTool, todoTool, resetChatTool];

export const ToolsByName = new Map<string, typeof Tools[number]>([
    ["todo", todoTool],
    ["calculator", calculatorTool],
    ["resetChat", resetChatTool],
    // Add more tools here
    // Motivational quotes
    // Weather
    // Jokes
]);
