import { Button } from "@radix-ui/themes";
import { Popover } from "@radix-ui/themes";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type CustomTooltipProps = {
    type: "information" | "hint";
    text?: string;
};

export const CustomTooltip = ({ type, text }: CustomTooltipProps) => {
    const { t } = useTranslation();

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
                            {t("tooltip.information.firstPart")}
                            <span className="font-bold">{`\n ${t("tooltip.information.or")} \n`}</span>
                            {t("tooltip.information.secondPart")}
                        </p>
                        <p className="text-sm">
                            {t("tooltip.information.additionalField")}
                            <span className="font-bold">{`\n ${t("tooltip.information.priority")}`}</span>
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
