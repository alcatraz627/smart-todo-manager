import { useState } from "preact/hooks";
import { TodoItem } from "../data/types.ts";
import { NewTodo } from "./NewTodo.tsx";
import { TodoRow } from "./TodoRow.tsx";

export interface TodoListProps {
    initialTodos: TodoItem[];
}

export const TodoList = ({ initialTodos }: TodoListProps) => {
    const [todoList, setTodoList] = useState(initialTodos);
    const [isRefetching, setIsRefetching] = useState(false);

    const refetch = () => {
        console.log("Refetch called!");
        setIsRefetching(true);
        return fetch("/todos")
            .then((response) => response.json())
            .then((data) => {
                setTodoList(data);
            })
            .finally(() => {
                setIsRefetching(false);
            });
    };

    return (
        <div class={"my-4 gap-2 flex flex-col"}>
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
