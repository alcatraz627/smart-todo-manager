import { defineRoute } from "$fresh/server.ts";
import { pushToHistory } from "../../data/history.ts";
import { promptLlm } from "./llm.ts";

// TODO: Move to utils file
export const jsonResponse = <T extends unknown>(
    data: T,
    status = 200,
    headers = {},
    ...rest: unknown[]
) => new Response(
    JSON.stringify(data),
    {
        headers: {
            "content-type": "application/json",
            ...headers,
        },
        status,
        ...rest,
    },
);

export const handler = {
    POST: defineRoute(async (req) => {
        // const shouldStream = req.headers.get("Should-Stream");
        const {
            history = [],
            question = "",
        } = await req.json() as {
            history: string[];
            question: string;
        };

        if (!question) {
            return jsonResponse({ message: "No question provided" });
        }

        // if (shouldStream) {
        //     const llmResponseStream = await streamLlm(chatHistory, todos);
        //     console.log({ llmResponseStream });
        //     return new Response(JSON.stringify(llmResponseStream), {
        //         headers: {
        //             "content-type": "application/json",
        //         },
        //     });
        // }

        // Add to history
        await pushToHistory(["user", question]);

        const response = await promptLlm(
            [...history, question],
        );

        // Add to history
        await pushToHistory(["system", response.content as string]);

        return jsonResponse(response);
    }),
};
