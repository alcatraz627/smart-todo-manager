import { Kv } from "@deno/kv";

export const KV_KEY = ["kv_key"];

export default function KvComponent(props: { kv: ReturnType<Kv["get"]> }) {
    return (
        <div>
            <h4>Kv value</h4>
            <pre>
            {JSON.stringify(props.kv, null, 2)}
            </pre>
        </div>
    );
}
