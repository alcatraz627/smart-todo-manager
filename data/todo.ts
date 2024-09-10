import { DenoStore, USER_NAME } from "./flags.ts";
import { TodoItem } from "./types.ts";

const { openKv } = Deno;

const TODO_KEY: Deno.KvKey = ["todo", USER_NAME];

// Local file
const kvStore = await openKv(DenoStore);

export const getTodoList = async (): Promise<TodoItem[]> => {
    if (!kvStore) throw Error("KV store not initialized");

    const todoState = await kvStore.get<TodoItem[]>(TODO_KEY);
    return todoState.value || [];
};

export const getTodo = async (id: string): Promise<TodoItem | undefined> => {
    if (!kvStore) throw Error("KV store not initialized");

    const todoState = await kvStore.get<TodoItem[]>(TODO_KEY);
    return todoState.value?.find((todo) => todo.id === id);
};

export const addTodo = async (todo: TodoItem) => {
    if (!kvStore) throw Error("KV store not initialized");

    const todoState =
        (await kvStore.get<TodoItem[]>(TODO_KEY)).value?.concat() || [];

    todoState.push(todo);
    await kvStore?.set(TODO_KEY, todoState);
};

export const updateTodo = async (todo: TodoItem) => {
    if (!kvStore) throw Error("KV store not initialized");

    const todoState = await kvStore.get<TodoItem[]>(TODO_KEY);
    const newTodoState = todoState.value?.map((t) =>
        t.id === todo.id ? todo : t
    );
    await kvStore?.set(TODO_KEY, newTodoState);
};

export const deleteTodo = async (id: string) => {
    if (!kvStore) throw Error("KV store not initialized");

    const todoState = await kvStore.get<TodoItem[]>(TODO_KEY);
    const newTodoState = todoState.value?.filter((todo) => todo.id !== id);
    await kvStore?.set(TODO_KEY, newTodoState);
};
