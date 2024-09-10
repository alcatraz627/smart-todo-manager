// import { useSignal } from "@preact/signals";
// import { CSS } from "$gfm";
import { AIMessageChunk } from "@langchain/core/messages";
import { useEffect, useRef, useState } from "preact/hooks";
import { Loader } from "../../components/Loader.tsx";
import { ChatItem } from "../../data/history.ts";
import { RichText } from "./RichText.tsx";

export interface ChatWidgetProps {
    refetch: () => Promise<void>;
    initialHistory: ChatItem[];
}

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

export function ChatWidget(
    { refetch, initialHistory: initialHistory = [] }: ChatWidgetProps,
) {
    const userInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [processing, setProcessing] = useState(false);
    const [history, setHistory] = useState<ChatItem[]>(initialHistory);

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

                // TODO: Streaming
                // for await (const chunk of readChunks(body)) {
                //     console.log(chunk);
                // }
            } else {
                const response = await resp.json() as AIMessageChunk;
                console.log("AI Message Response: ", response);

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

    useEffect(() => {
        scrollToBottom();
    }, [history.length]);

    const scrollToBottom = () => {
        const chatBox = document.querySelector("#history-list");
        chatBox?.scrollTo(0, chatBox.scrollHeight);
    };

    return (
        <div class="w-full h-[50vh] flex flex-col">
            <div
                id="history-list"
                class="w-full p-6 mb-4 rounded-sm overflow-y-auto bg-gray-50"
            >
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

            <div class="relative top-[-40px] pl-6">
                {processing &&
                    (
                        <Loader
                            type="infinity"
                            parentClass="absolute green-200"
                            freq={3}
                        />
                    )}
            </div>
            {/* TODO: Separate component */}
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
                    value=""
                    type="text"
                    placeholder="Enter your query here"
                    class={"input input-bordered input-lg w-[98%] mb-2 mx-[1%]"}
                    name="question"
                />
                <input type="submit" hidden />
            </form>
        </div>
    );
}
