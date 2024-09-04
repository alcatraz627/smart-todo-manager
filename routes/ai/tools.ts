import { assert } from "$std/assert/assert.ts";
import { tool } from "@langchain/core/tools";
import { z } from "npm:zod";
import {
    addTodo,
    deleteTodo,
    getTodo,
    getTodoList,
    updateTodo,
} from "../../data/todo.ts";

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

const todoSchema = z.object({
    action: z.enum(["list", "view", "delete", "edit", "create"]).describe(
        "Type of action to perform on a todo",
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
    console.log("Called todo Tool with", { action, id, todoData });
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

export const Tools = [calculatorTool, todoTool];

export const ToolsByName = new Map<string, typeof Tools[number]>([
    ["todo", todoTool],
    ["calculator", calculatorTool],
]);
