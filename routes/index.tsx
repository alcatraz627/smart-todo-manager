import { openKv } from "@deno/kv";
import KvComponent, { KV_KEY } from "../islands/Kv.tsx";

export default async function Home() {
  // const count = useSignal(3);

  const kv = await openKv();
  await kv.set(KV_KEY, { message: "Hello from KV!", timestamp: Date.now() });
  console.log(KV_KEY, await kv.get(KV_KEY));

  const kvData = await kv.get(KV_KEY);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>ccc
        <KvComponent kv={kvData.value} />
        {
          /* <Counter count={count} />
        <hr />
        <Countdown
          target={
            // date for tomorrow noon
            new Date(new Date().setHours(24, 0, 0, 0)).toISOString()
          }
        /> */
        }
      </div>
    </div>
  );
}
