import { Handlers } from "$fresh/server.ts";
import {
  addTodo,
  deleteTodo,
  getTodoList,
  updateTodo,
} from "../../data/todo.ts";
import { TodoItem } from "../../data/types.ts";

export const handler: Handlers = {
  async GET(_req) {
    const todos = await getTodoList();

    return new Response(JSON.stringify(todos), {
      headers: {
        "content-type": "application/json",
      },
    });
  },

  // Add the other methods
  async POST(req) {
    const { title } = await req.json();

    if (!title) {
      return new Response("Title is required", {
        status: 400,
      });
    }
    const newTodo: TodoItem = {
      id: Math.random().toString(),
      title: title,
      completed: false,
    };
    await addTodo(newTodo);

    // Add the todo to the list
    return new Response(JSON.stringify(newTodo), {
      headers: {
        "content-type": "application/json",
      },
      status: 201,
    });
  },

  async PUT(req) {
    const todo = await req.json();
    await updateTodo(todo);

    // Update the todo in the list
    return new Response(JSON.stringify(todo), {
      headers: {
        "content-type": "application/json",
      },
    });
  },

  async DELETE(req) {
    const id = new URL(req.url).searchParams.get("id");
    console.log("In delete", id, req.url);
    if (id) {
      await deleteTodo(id);
    }

    // Delete the todo from the list
    return new Response(JSON.stringify({ id }), {
      headers: {
        "content-type": "application/json",
      },
    });
  },
};
