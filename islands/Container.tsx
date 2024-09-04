import { useState } from "preact/hooks";
import { TodoItem } from "../data/types.ts";
import { ChatWidget } from "./chat/ChatWidget.tsx";
import { TodoList } from "./todo/TodoList.tsx";

export const Container = ({ initialTodos }: { initialTodos: TodoItem[] }) => {
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
        <div class="my-4 px-4 py-2 mx-auto w-11/12 mb-auto">
            <div class="bg-white rounded-sm border-x-4 py-4 mb-4">
                <div class="max-w-screen-md mx-auto flex flex-col items-start flex-start">
                    <h2 class={"text-3xl font-light"}>
                        Todo Manager
                    </h2>
                    <TodoList
                        todoList={todoList}
                        refetch={refetch}
                        isRefetching={isRefetching}
                    />
                </div>
            </div>

            <div class="bg-white rounded-sm border-x-4 py-4">
                <div class="max-w-screen-md mx-auto flex flex-col items-start flex-start">
                    <h2 class={"text-3xl font-light"}>
                        Chat
                    </h2>
                    {/* TODO: Chat App */}
                    <ChatWidget refetch={refetch} />
                </div>
            </div>
        </div>
    );
};
