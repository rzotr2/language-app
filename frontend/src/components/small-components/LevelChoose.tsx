import { useState } from "react";
import { Box, Flex, RadioCards } from "@radix-ui/themes";
import { IoChevronBackOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

type LanguageChooseProps = {
    getSelectedLevel: (selectedLevel?: string, back?: boolean) => void;
    show: boolean;
};

export default function LevelChoose(props: LanguageChooseProps) {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const { t } = useTranslation();

    return (
        <div
            className={`${props.show ? "sm:h-[500px] flex flex-col justify-between" : "w-0 h-0 overflow-hidden"}`}
        >
            <h3 className="text-sm mb-4 md:mb-7 md:text-xl font-semibold">
                {t("languageSelect.levelChoose.levelChooseTitle")}
            </h3>
            <div className="mb-6 md:w-2/3 mx-auto">
                <Box maxWidth="">
                    <RadioCards.Root
                        columns={{ initial: "1", sm: "2" }}
                        onValueChange={(value) => setSelectedLevel(value)}
                    >
                        <RadioCards.Item value="A1">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">
                                    {t("languageSelect.levelChoose.a1Title")}
                                </p>
                                <p>{t("languageSelect.levelChoose.a1Desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="A2">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">
                                    {t("languageSelect.levelChoose.a2Title")}
                                </p>
                                <p>{t("languageSelect.levelChoose.a2Desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="B1">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">
                                    {t("languageSelect.levelChoose.b1Title")}
                                </p>
                                <p>{t("languageSelect.levelChoose.b1Desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="B2">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">
                                    {t("languageSelect.levelChoose.b2Title")}
                                </p>
                                <p>{t("languageSelect.levelChoose.b2Desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="C1">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">
                                    {t("languageSelect.levelChoose.c1Title")}
                                </p>
                                <p>{t("languageSelect.levelChoose.c1Desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="C2">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">
                                    {t("languageSelect.levelChoose.c2Title")}
                                </p>
                                <p>{t("languageSelect.levelChoose.c2Desc")}</p>
                            </Flex>
                        </RadioCards.Item>
                    </RadioCards.Root>
                </Box>
            </div>
            <div className="flex justify-center items-center gap-5">
                <button
                    className="group text-sm font-medium flex items-center cursor-pointer"
                    onClick={() => props.getSelectedLevel(undefined, true)}
                >
                    <IoChevronBackOutline
                        className="transition-all group-hover:pe-1 group-hover:scale-125
                     group-hover:text-blue-500 text-lg"
                    />
                    <span className="transition-colors group-hover:text-blue-500 text-lg">
                        {t("languageSelect.back")}
                    </span>
                </button>
                <button
                    type="button"
                    disabled={!selectedLevel}
                    onClick={() => {
                        if (selectedLevel) {
                            props.getSelectedLevel(selectedLevel, false);
                        }
                    }}
                    className={`font-medium rounded-lg text-sm px-5 py-2.5 text-white 
                    ${
                        selectedLevel
                            ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            : "bg-blue-400 cursor-not-allowed"
                    }`}
                >
                    {t("languageSelect.continue")}
                </button>
            </div>
        </div>
    );
}
