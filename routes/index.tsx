import { getTodoList } from "../data/todo.ts";
import { Container } from "../islands/Container.tsx";

export default async function Home() {
  const initialTodos = await getTodoList();

  return <Container initialTodos={initialTodos} />;
}
