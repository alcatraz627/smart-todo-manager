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
        <div class={"my-4 gap-2 flex flex-col w-full"}>
            {todoList.map((todoItem) => (
                <TodoRow
                    refetch={refetch}
                    key={todoItem.id}
                    todoItem={todoItem}
                />
            ))}
            <hr />
            <NewTodo
                refetch={refetch}
            />
            {isRefetching && <div>Processing...</div>}
        </div>
    );
};
