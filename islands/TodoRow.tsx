import { useRef } from "preact/hooks";
import { TodoItem } from "../data/types.ts";

export interface TodoRowProps {
    todoItem: TodoItem;
    refetch: () => Promise<void>;
}

export const TodoRow = (
    { todoItem, refetch }: TodoRowProps,
) => {
    const todoTextRef = useRef<HTMLInputElement>(null);

    const handleSaveTodo = async (todoItem: TodoItem) => {
        // Delete the todo
        await fetch(`/todos`, {
            method: "PUT",
            body: JSON.stringify({
                ...todoItem,
                title: todoTextRef.current?.value,
            }),
        });

        refetch();
    };

    const handleDeleteTodo = async (todoItem: TodoItem) => {
        if (
            !confirm(`Delete todo ${todoItem.title}?`)
        ) return;

        // Delete the todo
        await fetch(`/todos?id=${todoItem.id}`, {
            method: "DELETE",
        });

        refetch();
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={todoItem.completed}
                class="mr-2"
            />
            <input
                type="text"
                value={todoItem.title}
                class={"text-lg"}
                ref={todoTextRef}
            />

            <button
                type="submit"
                name="id"
                value={todoItem.id}
                class="font-mono text-sm mx-1 hover:text-green-500 align-middle"
                onClick={() => handleSaveTodo(todoItem)}
            >
                update
            </button>
            <button
                type="submit"
                name="id"
                value={todoItem.id}
                class="font-mono text-sm  mx-1 rounded-full hover:text-red-500 align-middle"
                onClick={() => handleDeleteTodo(todoItem)}
            >
                delete
            </button>
        </div>
    );
};
