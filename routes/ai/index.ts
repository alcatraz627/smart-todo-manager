import { defineRoute } from "$fresh/server.ts";
import { promptLlm } from "./llm.ts";

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
            return new Response(
                JSON.stringify({ message: "No question provided" }),
                {
                    status: 400,

                    headers: {
                        "content-type": "application/json",
                    },
                },
            );
        }

        const chatHistory = [...history, question];

        // if (shouldStream) {
        //     const llmResponseStream = await streamLlm(chatHistory, todos);
        //     console.log({ llmResponseStream });
        //     return new Response(JSON.stringify(llmResponseStream), {
        //         headers: {
        //             "content-type": "application/json",
        //         },
        //     });
        // }

        const response = await promptLlm(
            chatHistory,
        );

        return new Response(
            JSON.stringify(response),
            {
                headers: {
                    "content-type": "application/json",
                },
            },
        );
    }),
};
