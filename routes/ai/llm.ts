import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import {
    AIMessage,
    HumanMessage,
    SystemMessage,
    ToolMessage,
} from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { Tools, ToolsByName } from "./tools.ts";

const fireworksLlm = new ChatFireworks({
    model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
    temperature: 0,
});

const openAiLlm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    streaming: true,
    temperature: 0,
});

const llm = openAiLlm.bindTools(Tools);

const DefaultPrompt =
    "You are a helpful assistant who uses tools provided to you to answer questions.";

export const promptLlm = async (
    history: string[] = [],
) => {
    const chatHistory = [
        new SystemMessage(DefaultPrompt),
        ...history.map((item, idx) =>
            idx % 2 ? new AIMessage(item) : new HumanMessage(item)
        ),
    ];

    let response = await llm.invoke(chatHistory);
    chatHistory.push(new AIMessage(response));

    console.log("Tool Calls: ", response.tool_calls);

    while (response?.tool_calls?.length) {
        for (const toolCall of response?.tool_calls || []) {
            const selectedTool = ToolsByName.get(toolCall.name);
            if (!selectedTool) continue;

            const toolMessage = await selectedTool.invoke(toolCall);
            console.log("Tool: ", { toolCall, toolMessage });
            chatHistory.push(new ToolMessage(toolMessage));
        }

        response = await llm.invoke(chatHistory);
        chatHistory.push(new AIMessage(response));
    }

    return response;
};
