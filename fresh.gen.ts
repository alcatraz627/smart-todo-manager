// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $ai_index from "./routes/ai/index.ts";
import * as $ai_llm from "./routes/ai/llm.ts";
import * as $ai_tools from "./routes/ai/tools.ts";
import * as $api_joke from "./routes/api/joke.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $todos_index from "./routes/todos/index.tsx";
import * as $Container from "./islands/Container.tsx";
import * as $Countdown from "./islands/Countdown.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $chat_ChatWidget from "./islands/chat/ChatWidget.tsx";
import * as $chat_RichText from "./islands/chat/RichText.tsx";
import * as $todo_NewTodo from "./islands/todo/NewTodo.tsx";
import * as $todo_TodoList from "./islands/todo/TodoList.tsx";
import * as $todo_TodoRow from "./islands/todo/TodoRow.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/ai/index.ts": $ai_index,
    "./routes/ai/llm.ts": $ai_llm,
    "./routes/ai/tools.ts": $ai_tools,
    "./routes/api/joke.ts": $api_joke,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/todos/index.tsx": $todos_index,
  },
  islands: {
    "./islands/Container.tsx": $Container,
    "./islands/Countdown.tsx": $Countdown,
    "./islands/Counter.tsx": $Counter,
    "./islands/chat/ChatWidget.tsx": $chat_ChatWidget,
    "./islands/chat/RichText.tsx": $chat_RichText,
    "./islands/todo/NewTodo.tsx": $todo_NewTodo,
    "./islands/todo/TodoList.tsx": $todo_TodoList,
    "./islands/todo/TodoRow.tsx": $todo_TodoRow,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
