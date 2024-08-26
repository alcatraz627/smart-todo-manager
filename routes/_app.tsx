import { type PageProps } from "$fresh/server.ts";

const showBorder = false;

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>smart-todo-app</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body
        class={"bg-gray-100 h-screen flex flex-col items-center justify-center" +
          (showBorder ? " border-red-500 border-solid border-4" : "")}
      >
        <Component />
      </body>
    </html>
  );
}
