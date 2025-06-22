import { useState } from "react";
import { Box, Flex, RadioCards } from "@radix-ui/themes";
import { IoChevronBackOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

type TopicsChooseProps = {
    getSelectedTopic: (selectedLevel?: string, back?: boolean) => void;
    show: boolean;
};

export default function TopicsChoose(props: TopicsChooseProps) {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const { t } = useTranslation();

    return (
        <div
            className={`${props.show ? "sm:h-[500px] flex flex-col justify-between" : "w-0 h-0 overflow-hidden"}`}
        >
            <h3 className="text-sm mb-4 md:mb-7 md:text-xl font-semibold">
                {t("interests.title")}
            </h3>
            <div className="mb-6 md:w-2/3 mx-auto">
                <Box maxWidth="">
                    <RadioCards.Root
                        defaultValue="1"
                        columns={{ initial: "1", sm: "2" }}
                        onValueChange={(value) => setSelectedTopic(value)}
                    >
                        <RadioCards.Item
                            value={`${t("interests.topics.technology.label")}: ${t("interests.topics.technology.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">
                                    {t("interests.topics.technology.label")}
                                </p>
                                <p>{t("interests.topics.technology.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("interests.topics.food.label")}: ${t("interests.topics.food.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("interests.topics.food.label")}</p>
                                <p>{t("interests.topics.food.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("interests.topics.culture.label")}: ${t("interests.topics.culture.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("interests.topics.culture.label")}</p>
                                <p>{t("interests.topics.culture.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("interests.topics.sports.label")}: ${t("interests.topics.sports.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("interests.topics.sports.label")}</p>
                                <p>{t("interests.topics.sports.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("interests.topics.environment.label")}: ${t("interests.topics.environment.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">
                                    {t("interests.topics.environment.label")}
                                </p>
                                <p>{t("interests.topics.environment.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item
                            value={`${t("interests.topics.art.label")}: ${t("interests.topics.art.desc")}`}
                        >
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">{t("interests.topics.art.label")}</p>
                                <p>{t("interests.topics.art.desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                    </RadioCards.Root>
                </Box>
            </div>
            <div className="flex justify-center items-center gap-5">
                <button
                    className="group text-sm font-medium flex items-center cursor-pointer"
                    onClick={() => props.getSelectedTopic(undefined, true)}
                >
                    <IoChevronBackOutline
                        className="transition-all group-hover:pe-1 group-hover:scale-125
                     group-hover:text-blue-500 text-lg"
                    />
                    <span className="transition-colors group-hover:text-blue-500 text-lg">
                        {t("interests.back")}
                    </span>
                </button>
                <button
                    type="button"
                    disabled={!selectedTopic}
                    onClick={() => {
                        if (selectedTopic) {
                            props.getSelectedTopic(selectedTopic, false);
                        }
                    }}
                    className={`font-medium rounded-lg text-sm px-5 py-2.5 text-white 
                    ${
                        selectedTopic
                            ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            : "bg-blue-400 cursor-not-allowed"
                    }`}
                >
                    {t("interests.continue")}
                </button>
            </div>
        </div>
    );
}
