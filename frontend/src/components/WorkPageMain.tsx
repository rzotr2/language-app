import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { Box, Flex, RadioCards } from "@radix-ui/themes";
import { CustomTooltip } from "./small-components/CustomTooltip.tsx";
import { DifficultyChoose } from "./small-components/DifficultyChoose.tsx";
import { HintCard } from "./small-components/HintCard.tsx";
import { FaMagic } from "react-icons/fa";
import { getRandomImage } from "../services/images.ts";
import { useExerciseStore } from "../../store/exercises.ts";
import { ExerciseArea } from "./small-components/ExerciseArea.tsx";
import type { DefaultPropsForGeneration, ExerciseType, LanguageOption, PhotoType } from "../types";
import { useTranslation } from "react-i18next";

import {
    generateBlanks,
    generateCards,
    generateText,
    generateQuizCards,
    generateEssayTopic,
} from "../services/ai.ts";
import { useAuthState } from "../../store/auth.ts";

type WorkPageMainProps = {
    getIsLoading: (isLoading: boolean) => void;
};

const languageOptions: LanguageOption[] = [
    { value: "en", label: "English 🇬🇧" },
    { value: "de", label: "Deutsch 🇩🇪" },
    { value: "uk", label: "Ukrainian 🇺🇦" },
    { value: "fr", label: "French 🇫🇷" },
    { value: "es", label: "Spanish 🇪🇸" },
    { value: "pl", label: "Polish 🇵🇱" },
    { value: "other", label: "Other" },
];

function WorkPageMain({ getIsLoading }: WorkPageMainProps) {
    const anchorRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const { currentUser } = useAuthState();

    const [selectedLanguageToLearn, setSelectedLanguageToLearn] = useState(
        languageOptions.find((lang) => {
            return currentUser?.languageToLearn === lang.value;
        }) ?? null,
    );
    const [selectedNativeLanguage, setSelectedNativeLanguage] = useState(
        languageOptions.find((lang) => {
            return currentUser?.nativeLanguage === lang.value;
        }) ?? null,
    );

    useEffect(() => {
        (async () => {
            const languageToLearn =
                languageOptions.find((lang) => {
                    return currentUser?.languageToLearn === lang.value;
                }) ?? null;
            const nativeLanguage =
                languageOptions.find((lang) => {
                    return currentUser?.nativeLanguage === lang.value;
                }) ?? null;

            if (languageToLearn && nativeLanguage) {
                setSelectedLanguageToLearn(languageToLearn);
                setSelectedNativeLanguage(nativeLanguage);
            }
        })();
    }, []);

    const {
        generalPrompt,
        nativeLanguage,
        languageToLearn,
        exerciseNumber,
        exercise,
        difficulty,
        currentText,
        currentTopic,
        currentPhoto,
        blanksArray,
        cardsArray,
        quizCards,
        languageResult,

        setField,
        setFields,
    } = useExerciseStore();

    const navigateToAnchor = () => {
        setTimeout(() => {
            anchorRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const generateMore = () => {
        handleGenerateClick();
    };

    const handleGenerateClick = () => {
        if (!currentUser) {
            return;
        }

        setFields({
            currentText: null,
            blanksArray: null,
            cardsArray: null,
            quizCards: null,
            currentPhoto: null,
            currentTopic: null,
        });

        const propertiesObj: DefaultPropsForGeneration = {
            generalPrompt,
            nativeLanguage,
            selectedNativeLanguage,
            languageToLearn,
            selectedLanguageToLearn,
            exerciseNumber,
            exercise,
            difficulty,
            level: currentUser?.level,
            interests: currentUser?.interests,
            goals: currentUser?.goals,
        };

        getIsLoading(true);
        switch (exercise) {
            case "translation": {
                generateText(propertiesObj).then((data) => {
                    const parsed = JSON.parse(data.data.output_text);
                    setField("currentText", parsed.text);
                    setField("languageResult", parsed.languages);
                    getIsLoading(false);
                    navigateToAnchor();
                });
                break;
            }
            case "blanks": {
                generateBlanks(propertiesObj).then((data) => {
                    const parsed = JSON.parse(data.data.output_text);
                    setField("blanksArray", parsed);
                    getIsLoading(false);
                    navigateToAnchor();
                });
                break;
            }
            case "cards": {
                generateCards(propertiesObj).then((data) => {
                    const parsed = JSON.parse(data.data.output_text);
                    setField("cardsArray", parsed);
                    getIsLoading(false);
                    navigateToAnchor();
                });
                break;
            }
            case "quiz": {
                generateQuizCards(propertiesObj).then((data) => {
                    const parsed = JSON.parse(data.data.output_text);
                    setField("quizCards", parsed);
                    getIsLoading(false);
                    navigateToAnchor();
                });
                break;
            }
            case "imageDesc": {
                getRandomImage()
                    .then((data) => {
                        const photo: PhotoType = {
                            src: data.src.landscape,
                            alt: data.alt,
                        };
                        setField("currentPhoto", photo);
                        getIsLoading(false);
                        navigateToAnchor();
                    })
                    .catch((err) => console.log(err));
                break;
            }
            case "essay": {
                generateEssayTopic(propertiesObj).then((data) => {
                    const parsed = JSON.parse(data.data.output_text);
                    setField("currentTopic", parsed);
                    getIsLoading(false);
                    navigateToAnchor();
                });
                break;
            }
        }
    };

    const exerciseProps = {
        getIsLoading,
        text: currentText,
        nativeLanguage: languageResult?.native as string,
        languageToLearn: languageResult?.target as string,
        blanksArray,
        cardsArray,
        quizCards,
        currentPhoto,
        currentTopic,
        generateMore,
        difficulty,
        languageResult,
    };

    return (
        <>
            <div className="flex-1 h-full mt-5">
                <section className="md:py-5 py-2 px-5 font-bold container mx-auto md:max-w-[75vw] lg:max-w-[55vw] shadow-md">
                    <div className="space-y-3 mb-5">
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                {t("work.whatToGenerate")}
                            </label>
                            <CustomTooltip type="information" />
                        </div>
                        <textarea
                            onInput={(event) => {
                                setField("generalPrompt", event.currentTarget.value);
                            }}
                            disabled={exercise === "imageDesc"}
                            id="message"
                            rows={6}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                  disabled:cursor-not-allowed border-gray-300 focus:ring-blue-500
                                  disabled:opacity-50 focus:border-blue-500"
                            placeholder={`${t("work.promptPlaceholder")}`}
                        ></textarea>
                        <div className="flex items-center justify-around flex-wrap gap-5">
                            <div className="flex-col justify-center items-center w-full sm:w-auto">
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    {t("work.iSpeak")}
                                </label>
                                {selectedNativeLanguage && (
                                    <Select
                                        isSearchable={false}
                                        className="md:w-[160px] text-center"
                                        defaultValue={selectedNativeLanguage}
                                        onChange={(option) => {
                                            setField("nativeLanguage", option!.value);
                                        }}
                                        options={languageOptions}
                                    />
                                )}
                                {!selectedNativeLanguage && (
                                    <Select
                                        isSearchable={false}
                                        className="md:w-[160px] text-center"
                                        onChange={(option) => {
                                            setField("nativeLanguage", option!.value);
                                        }}
                                        options={languageOptions}
                                    />
                                )}
                            </div>
                            <div className="flex-col justify-center items-center w-full sm:w-auto">
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    {t("work.iWantToLearn")}
                                </label>
                                {selectedLanguageToLearn && (
                                    <Select
                                        isSearchable={false}
                                        className="md:w-[160px] text-center"
                                        defaultValue={selectedLanguageToLearn}
                                        onChange={(option) => {
                                            setField("languageToLearn", option!.value);
                                        }}
                                        options={languageOptions}
                                    />
                                )}
                                {!selectedLanguageToLearn && (
                                    <Select
                                        isSearchable={false}
                                        className="md:w-[160px] text-center"
                                        onChange={(option) => {
                                            setField("languageToLearn", option!.value);
                                        }}
                                        options={languageOptions}
                                    />
                                )}
                            </div>
                            <div className="w-full md:w-[200px]">
                                <label
                                    htmlFor="visitors"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    {t("work.selectNumber")}
                                </label>
                                <input
                                    type="number"
                                    id="visitors"
                                    max={10}
                                    min={1}
                                    defaultValue={5}
                                    disabled={
                                        exercise === "translation" ||
                                        exercise === "imageDesc" ||
                                        exercise === "essay"
                                    }
                                    onInput={(e) =>
                                        setField("exerciseNumber", e.currentTarget.value)
                                    }
                                    className="bg-gray-50 border py-2 border-gray-300 text-gray-900 text-sm
                                    rounded-lg disabled:cursor-not-allowed focus:ring-blue-500 focus:border-blue-500
                                    block w-full p-2.5 disabled:opacity-50"
                                />
                            </div>
                            <div className="w-full flex flex-col items-center sm:block space-y-6">
                                <div className="flex flex-wrap gap-3 justify-between items-end">
                                    <div className="w-full md:max-w-1/2 mx-auto md:mx-0">
                                        <DifficultyChoose
                                            value={difficulty}
                                            onChange={(val) => setField("difficulty", val)}
                                        />
                                    </div>
                                    <HintCard />
                                </div>
                                <Box className="w-[300px] sm:w-auto">
                                    <label
                                        htmlFor="visitors"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        {t("work.selectType")}
                                    </label>
                                    <RadioCards.Root
                                        defaultValue="translation"
                                        columns={{ initial: "1", sm: "3" }}
                                        onValueChange={(value) =>
                                            setField("exercise", value as ExerciseType)
                                        }
                                    >
                                        <RadioCards.Item value="translation">
                                            <Flex
                                                direction="column"
                                                width="100%"
                                            >
                                                <p className="font-bold">
                                                    {t("work.types.translation.title")}
                                                </p>
                                                <p>{t("work.types.translation.desc")}</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="blanks">
                                            <Flex
                                                direction="column"
                                                width="100%"
                                            >
                                                <p className="font-bold">
                                                    {t("work.types.blanks.title")}
                                                </p>
                                                <p>{t("work.types.blanks.desc")}</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="cards">
                                            <Flex
                                                direction="column"
                                                width="100%"
                                            >
                                                <p className="font-bold">
                                                    {t("work.types.cards.title")}
                                                </p>
                                                <p>{t("work.types.cards.desc")}</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="quiz">
                                            <Flex
                                                direction="column"
                                                width="100%"
                                            >
                                                <p className="font-bold">
                                                    {t("work.types.quiz.title")}
                                                </p>
                                                <p>{t("work.types.quiz.desc")}</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="imageDesc">
                                            <Flex
                                                direction="column"
                                                width="100%"
                                            >
                                                <p className="font-bold">
                                                    {t("work.types.imageDesc.title")}
                                                </p>
                                                <p>{t("work.types.imageDesc.desc")}</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="essay">
                                            <Flex
                                                direction="column"
                                                width="100%"
                                            >
                                                <p className="font-bold">
                                                    {t("work.types.essay.title")}
                                                </p>
                                                <p>{t("work.types.essay.desc")}</p>
                                            </Flex>
                                        </RadioCards.Item>
                                    </RadioCards.Root>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-5 sm:mb-0 w-full flex justify-end">
                        <button
                            className="button flex items-center gap-2"
                            onClick={handleGenerateClick}
                        >
                            {t("work.generate")} <FaMagic />
                        </button>
                    </div>
                </section>
                <section ref={anchorRef}>
                    <ExerciseArea {...exerciseProps} />
                </section>
            </div>
        </>
    );
}

export default WorkPageMain;
