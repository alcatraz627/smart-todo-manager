import { useState } from "preact/hooks";
import { ChatItem } from "../data/history.ts";
import { TodoItem } from "../data/types.ts";
import { ChatWidget } from "./chat/ChatWidget.tsx";
import { TodoList } from "./todo/TodoList.tsx";

export const Container = (
    { initialTodos, initialHistory }: {
        initialTodos: TodoItem[];
        initialHistory: ChatItem[];
    },
) => {
    const [todoList, setTodoList] = useState(initialTodos);
    const [isRefetching, setIsRefetching] = useState(false);

    const refetch = async () => {
        console.log("Refetch called!");
        setIsRefetching(true);
        try {
            const response = await fetch("/todos");
            const data = await response.json();
            setTodoList(data);
        } catch (error) {
            console.log("Error while refetching", error);
        } finally {
            setIsRefetching(false);
        }
    };

    return (
        <div class="mx-0 w-full my-auto h-full flex flex-col">
            <div class="flex-1">
                <TodoList
                    todoList={todoList}
                    refetch={refetch}
                    isRefetching={isRefetching}
                />
            </div>
            <div class="flex-1">
                <div class="divider h-50">Smart Todo App</div>
                <ChatWidget
                    refetch={refetch}
                    initialHistory={initialHistory}
                />
            </div>
        </div>
    );
};
