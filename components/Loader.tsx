export type LoaderTypes =
    | "spinner"
    | "dots"
    | "ring"
    | "ball"
    | "bars"
    | "infinity";

export type LoaderProps = {
    parentClass?: string;
    childClass?: string;
    type: LoaderTypes;
    freq?: number;
};

export const Loader = (
    { parentClass = "", childClass = "", type = "ball", freq = 1 }: LoaderProps,
) => (
    <div class={parentClass}>
        {Array.from(Array(freq)).map((_v, idx) => (
            <span
                key={idx}
                class={`loading loading-${type} loading-sm text-primary ${childClass}`}
            >
            </span>
        ))}
    </div>
);
