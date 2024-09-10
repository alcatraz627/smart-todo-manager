import { useRef } from "preact/hooks";

export interface NewTodoProps {
    refetch: () => Promise<void>;
}

export const NewTodo = ({ refetch }: NewTodoProps) => {
    const todoTextRef = useRef<HTMLInputElement>(null);

    const handleSaveTodo = async () => {
        // Delete the todo
        await fetch(`/todos`, {
            method: "POST",
            body: JSON.stringify({
                title: todoTextRef.current?.value,
            }),
        });

        refetch();
    };

    return (
        <div class="py-4 px-4">
            <input
                type="text"
                name="title"
                ref={todoTextRef}
                placeholder={"Add new todo"}
                class={"input input-bordered input-sm w-full max-w-xs"}
            />
            <button
                onClick={handleSaveTodo}
                // disabled={!newTodoTitle.length}
                class={"btn btn-info btn-outline btn-sm"}
            >
                Add
            </button>
        </div>
    );
};
