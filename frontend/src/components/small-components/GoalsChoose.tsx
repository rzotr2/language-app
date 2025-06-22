import { useState } from "react";
import { Box, Flex, RadioCards } from "@radix-ui/themes";
import { IoChevronBackOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

type GoalsChooseProps = {
    getSelectedGoal: (selectedLevel?: string, back?: boolean) => void;
    show: boolean;
};

export default function GoalsChoose(props: GoalsChooseProps) {
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
    const { t } = useTranslation();

    return (
        <div
            className={`${props.show ? "sm:h-[500px] flex flex-col justify-between" : "w-0 h-0 overflow-hidden"}`}
        >
            <h3 className="text-sm mb-4 md:mb-7 md:text-xl font-semibold">{t("goals.title")}</h3>
            <div className="mb-6 md:w-2/3 mx-auto">
                <Box maxWidth="">
                    <RadioCards.Root
                        defaultValue="1"
                        columns={{ initial: "1", sm: "2" }}
                        onValueChange={(value) => setSelectedGoal(value)}
                    >
                        <RadioCards.Item
                            value={`${t("goals.options.travel.label")}: ${t("goals.options.travel.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("goals.options.travel.label")}</p>
                                <p>{t("goals.options.travel.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("goals.options.business.label")}: ${t("goals.options.business.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("goals.options.business.label")}</p>
                                <p>{t("goals.options.business.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("goals.options.exam.label")}: ${t("goals.options.exam.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("goals.options.exam.label")}</p>
                                <p>{t("goals.options.exam.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("goals.options.academic.label")}: ${t("goals.options.academic.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("goals.options.academic.label")}</p>
                                <p>{t("goals.options.academic.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("goals.options.personal.label")}: ${t("goals.options.personal.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("goals.options.personal.label")}</p>
                                <p>{t("goals.options.personal.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("goals.options.listening.label")}: ${t("goals.options.listening.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("goals.options.listening.label")}</p>
                                <p>{t("goals.options.listening.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                    </RadioCards.Root>
                </Box>
            </div>
            <div className="flex justify-center items-center gap-5">
                <button
                    className="group text-sm font-medium flex items-center cursor-pointer"
                    onClick={() => props.getSelectedGoal(undefined, true)}
                >
                    <IoChevronBackOutline
                        className="transition-all group-hover:pe-1 group-hover:scale-125
                     group-hover:text-blue-500 text-lg"
                    />
                    <span className="transition-colors group-hover:text-blue-500 text-lg">
                        {t("goals.back")}
                    </span>
                </button>
                <button
                    type="button"
                    disabled={!selectedGoal}
                    onClick={() => {
                        if (selectedGoal) {
                            props.getSelectedGoal(selectedGoal, false);
                        }
                    }}
                    className={`font-medium rounded-lg text-sm px-6.5 py-2.5 text-white 
                    ${
                        selectedGoal
                            ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            : "bg-blue-400 cursor-not-allowed"
                    }`}
                >
                    {t("goals.submit")}
                </button>
            </div>
        </div>
    );
}
