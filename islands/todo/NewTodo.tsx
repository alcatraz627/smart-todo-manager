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
        <div>
            <input
                type="text"
                name="title"
                ref={todoTextRef}
                placeholder={"Add new todo"}
                class={"text-lg px-2 border-gray-200 hover:border-gray-500 transition-all border-2"}
            />
            <button
                onClick={handleSaveTodo}
                // disabled={!newTodoTitle.length}
                class={"mx-2 bg-gray-100 hover:enabled:bg-gray-300 transition-all rounded-sm text-gray-700 disabled:text-gray-300 px-4 py-1"}
            >
                Add
            </button>
        </div>
    );
};
