import { getTodoList } from "../data/todo.ts";
import { TodoItem } from "../data/types.ts";
import { TodoList } from "../islands/TodoList.tsx";

export default async function Home() {
  const todoList = await getTodoList();
  const todoItems: TodoItem[] = todoList;

  return (
    <div class="my-16 px-4 py-8 mx-auto w-11/12 mb-auto bg-white rounded-sm  border-x-4">
      <div class="max-w-screen-md mx-auto flex flex-col items-start flex-start">
        <h2 class={"text-3xl font-light"}>
          Todo Manager
        </h2>
        <TodoList initialTodos={todoItems} />
      </div>
    </div>
  );
}
