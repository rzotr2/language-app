import { Button } from "@radix-ui/themes";
import { Popover } from "@radix-ui/themes";
import { FaRegQuestionCircle } from "react-icons/fa";

type CustomTooltipProps = {
    type: "information" | "hint";
    text?: string;
};

export const CustomTooltip = ({ type, text }: CustomTooltipProps) => {
    return (
        <>
            {type === "information" ? (
                <Popover.Root>
                    <Popover.Trigger>
                        <Button variant="soft">
                            <FaRegQuestionCircle />
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content
                        size="1"
                        maxWidth="300px"
                        className="space-y-2"
                    >
                        <p className="text-sm">
                            To get the best experience, you`ll need to add language manually,
                            <span className="font-bold">{`\n or \n`}</span>
                            mention your native language and language you want to learn in this
                            field.
                        </p>
                        <p className="text-sm">
                            This prompt field has
                            <span className="font-bold">{`\n the highest priority.`}</span>
                        </p>
                    </Popover.Content>
                </Popover.Root>
            ) : (
                <Popover.Root>
                    <Popover.Trigger className="p-0">
                        <FaRegQuestionCircle className="rounded-full  text-blue-700 font-bold  border-0.5 border-blue-200 text-lg" />
                    </Popover.Trigger>
                    <Popover.Content
                        size="1"
                        maxWidth="300px"
                    >
                        <p className="text-sm">{text}</p>
                    </Popover.Content>
                </Popover.Root>
            )}
        </>
    );
};
