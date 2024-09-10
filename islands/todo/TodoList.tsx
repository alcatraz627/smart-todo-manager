import { Loader } from "../../components/Loader.tsx";
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
        <div class="w-full min-h-50vh flex flex-col">
            <NewTodo
                refetch={refetch}
            />
            {isRefetching && <Loader type="spinner" />}

            <div
                class={"flex-1 gap-2 flex flex-col overflow-y-auto max-h-[50vh] w-100"}
            >
                <ul class="menu bg-grey-300 rounded-box w-100">
                    {todoList.map((todoItem) => (
                        <TodoRow
                            refetch={refetch}
                            key={todoItem.id}
                            todoItem={todoItem}
                        />
                    ))}
                    {todoList.length === 0 && <div>No todos</div>}
                </ul>
            </div>
        </div>
    );
};
