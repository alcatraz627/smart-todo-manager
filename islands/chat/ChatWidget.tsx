// import { useSignal } from "@preact/signals";
// import { CSS } from "$gfm";
import { AIMessageChunk } from "@langchain/core/messages";
import { useRef, useState } from "preact/hooks";
import { RichText } from "./RichText.tsx";

export interface ChatWidgetProps {
    refetch: () => Promise<void>;
}

export type ChatItem = ["system" | "user", string];

const shouldStream: boolean = false;

function readChunks(reader: ReadableStreamDefaultReader<Uint8Array>) {
    return {
        async *[Symbol.asyncIterator]() {
            let readResult = await reader.read();
            while (!readResult.done) {
                yield readResult.value;
                readResult = await reader.read();
            }
        },
    };
}

export function ChatWidget({ refetch }: ChatWidgetProps) {
    const userInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [processing, setProcessing] = useState(false);
    const [history, setHistory] = useState<ChatItem[]>([]);

    const handleSubmit = async () => {
        try {
            const userInput = userInputRef.current?.value;
            if (!userInput) return;

            setProcessing(true);
            const payload = {
                question: userInput,
                history: history.map((item) => item[1]),
            };
            setHistory((state) => [...state, ["user", userInput]]);

            const resp = await fetch("/ai", {
                body: JSON.stringify(payload),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(shouldStream && {
                        "Should-Stream": "true",
                    }),
                },
            });

            if (shouldStream) {
                const body = resp?.body?.getReader();
                if (!body) return;

                for await (const chunk of readChunks(body)) {
                    console.log(chunk);
                }
            } else {
                const response = await resp.json() as AIMessageChunk;
                console.log(response);

                setHistory((
                    state,
                ) => [...state, [
                    "system",
                    response.kwargs.content as string,
                ]]);
            }

            formRef.current?.reset();
            setProcessing(false);
            refetch();
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <div class="w-full mt-4">
            <div class="bg-gray-100 w-full p-6 mb-4 rounded-sm overflow-y-auto h-screen max-h-[30vh]">
                {history.map((msg, idx) => (
                    <div
                        key={idx}
                        class="mb-2 flex flex-row align-middle justify-center mr-auto"
                    >
                        <RichText
                            who={msg[0]}
                            markdown={msg[1]}
                        />
                    </div>
                ))}
            </div>
            <div>
                {processing ? "Fetching..." : ""}
            </div>
            <form
                ref={formRef}
                onSubmit={(e) => {
                    handleSubmit();
                    e.preventDefault();
                    return false;
                }}
            >
                <input
                    disabled={processing}
                    ref={userInputRef}
                    value="Give me a summary"
                    type="text"
                    placeholder="Enter your query here"
                    class={"w-full border-2 border-gray-300 p-2"}
                    name="question"
                />
                <input type="submit" hidden />
            </form>
        </div>
    );
}
