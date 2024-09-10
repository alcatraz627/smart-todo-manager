import { readHistory } from "../data/history.ts";
import { getTodoList } from "../data/todo.ts";
import { Container } from "../islands/Container.tsx";

export default async function Home() {
  const initialTodos = await getTodoList();
  const initialHistory = await readHistory();

  return (
    <Container initialTodos={initialTodos} initialHistory={initialHistory} />
  );
}
