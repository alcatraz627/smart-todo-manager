import { Handlers, PageProps } from "$fresh/server.ts";

export interface GreetQueryParams {
  age?: number;
}

export const handler: Handlers<GreetQueryParams> = {
  GET: (req, ctx) => {
    const url = new URL(req.url);
    const age = Number(url.searchParams.get("age"));
    return ctx.render({ age });
  },
};

export default function Greet(props: PageProps<GreetQueryParams>) {
  return (
    <div>
      Hello {props.params.name}, age {props.data.age}
    </div>
  );
}
