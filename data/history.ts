import { DenoStore, USER_NAME } from "./flags.ts";

export type ChatItem = ["system" | "user", string];

const { openKv } = Deno;

const HISTORY_KEY: Deno.KvKey = ["history", USER_NAME];

const kvStore = await openKv(DenoStore);

export const pushToHistory = async (item: ChatItem) => {
    if (!kvStore) throw Error("KV store not initialized");

    const historyState =
        (await kvStore.get<ChatItem[]>(HISTORY_KEY)).value?.concat() || [];

    historyState.push(item);
    await kvStore?.set(HISTORY_KEY, historyState);
};

export const readHistory = async (): Promise<ChatItem[]> => {
    if (!kvStore) throw Error("KV store not initialized");

    const historyState = await kvStore.get<ChatItem[]>(HISTORY_KEY);
    return historyState.value || [];
};

export const resetHistory = async () => {
    if (!kvStore) throw Error("KV store not initialized");

    await kvStore?.set(HISTORY_KEY, []);
};
