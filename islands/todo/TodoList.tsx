import { TodoItem } from "../../data/types.ts";
import { NewTodo } from "./NewTodo.tsx";
import { TodoRow } from "./TodoRow.tsx";

export interface TodoListProps {
    todoList: TodoItem[];
    refetch: () => Promise<void>;
    isRefetching?: boolean;
}

export const TodoList = (
    { todoList, refetch, isRefetching }: TodoListProps,
) => {
    return (
        <div
            class={"my-2 gap-2 flex flex-col w-full overflow-y-auto h-screen max-h-[40vh]"}
        >
            <ul class="menu bg-base-200 rounded-box w-100">
                {todoList.map((todoItem) => (
                    <TodoRow
                        refetch={refetch}
                        key={todoItem.id}
                        todoItem={todoItem}
                    />
                ))}
                {todoList.length === 0 && <div>No todos</div>}
            </ul>
            <hr />
            <NewTodo
                refetch={refetch}
            />
            {isRefetching && <div>Processing...</div>}
        </div>
    );
};
