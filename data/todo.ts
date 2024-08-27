import { TodoItem } from "./types.ts";

const { openKv } = Deno;

const TODO_KEY: Deno.KvKey = ["todo", "default_user"];

const DenoStore =
    "https://api.deno.com/databases/2530d711-59a2-4b5b-a3ce-a73ed18a10ff/connect";

// Local file
// const DenoStore = "./local.sqlite";
// const DenoStore = ":memory:";

const kvStore = await openKv(DenoStore);

export const getTodoList = async (): Promise<TodoItem[]> => {
    if (!kvStore) throw Error("KV store not initialized");

    const todoState = await kvStore.get<TodoItem[]>(TODO_KEY);
    return todoState.value || [];
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
