// import { CSS, render } from "$gfm";
import { Marked } from "npm:@ts-stack/markdown";
import type { JSX } from "preact/jsx-runtime";

export interface RichTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
    markdown: string;
    who: "user" | "system";
}

export const RichText = (
    { markdown, ...props }: RichTextProps,
) => {
    const html = Marked.parse(markdown, {});

    const isUser = props.who === "user";

    return (
        <div class={"w-full "}>
            <div class={(isUser ? "ml-auto" : "mr-auto") + " w-[50%] text-sm"}>
                <div
                    class={"px-4 py-1 w-fit rounded-md font-xs pb-1 " +
                        (isUser
                            ? "ml-auto bg-blue-200"
                            : "mr-auto bg-green-200")}
                    style={{ translate: (isUser ? "" : "-") + "6px 6px" }}
                >
                    {isUser ? "You" : "System"}
                </div>
                <div
                    class={"rounded-md bg-white p-2 border-4 " +
                        (isUser ? "border-blue-100" : "border-green-100")}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
};
