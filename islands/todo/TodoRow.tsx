import { useRef } from "preact/hooks";
import { TodoItem } from "../../data/types.ts";

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
        <li class={"flex flex-row max-w-[800px] content-center h-[45px]"}>
            <input
                type="checkbox checkbox-lg"
                checked={todoItem.completed}
                class="checkbox"
                onClick={() => {
                    handleSaveTodo({
                        ...todoItem,
                        completed: !todoItem.completed,
                    });
                }}
            />
            <input
                type="text"
                value={todoItem.title}
                class={"input input-sm w-[60%]"}
                ref={todoTextRef}
            />

            <button
                type="submit"
                name="id"
                value={todoItem.id}
                class="btn btn-outline btn-info btn-sm mx-2"
                onClick={() => handleSaveTodo(todoItem)}
                title="update"
            >
                u
            </button>
            <button
                type="submit"
                name="id"
                value={todoItem.id}
                class="btn btn-outline btn-error btn-sm"
                onClick={() => handleDeleteTodo(todoItem)}
                title="delete"
            >
                d
            </button>
        </li>
    );
};
