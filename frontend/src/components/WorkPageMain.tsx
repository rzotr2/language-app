import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { Box, Flex, RadioCards } from "@radix-ui/themes";
import { TextTranslation } from "./small-components/text-translation/TextTranslation.tsx";
import { CustomTooltip } from "./small-components/CustomTooltip.tsx";
import { DifficultyChoose } from "./small-components/DifficultyChoose.tsx";
import { HintCard } from "./small-components/HintCard.tsx";
import { FaMagic } from "react-icons/fa";
import type { User } from "../models/user.ts";
import { findUserById } from "../services/users.ts";
import type {
    BlanksArray,
    DefaultPropsForGeneration, EssayType,
    ExerciseType,
    FlipCardType,
    LanguageOption, PhotoType,
    QuizCard
} from "../types";
import {generateBlanks, generateCards, generateText, generateQuizCards, generateEssayTopic} from "../services/ai.ts";
import { FillTheBlanks } from "./small-components/fill-blanks/FillTheBlanks.tsx";
import { CardsFlipExercise } from "./small-components/flip-cards/CardsFlipExercise.tsx";
import { QuizExercise } from "./small-components/quiz/QuizExercise.tsx";
import { getRandomImage } from "../services/images.ts";
import {DescribeImageExercise} from "./small-components/describe-image/DescribeImageExercise.tsx";
import {EssayExercise} from "./small-components/essay/EssayExercise.tsx";

type WorkPageMainProps = {
    getIsLoading: (isLoading: boolean) => void;
}

const languageOptions: LanguageOption[] = [
    { value: "en", label: "English 🇬🇧" },
    { value: "de", label: "Deutsch 🇩🇪" },
    { value: "uk", label: "Ukrainian 🇺🇦" },
    { value: "fr", label: "French 🇫🇷" },
    { value: "es", label: "Spanish 🇪🇸" },
    { value: "pl", label: "Polish 🇵🇱" },
    { value: "other", label: "Other" },
];

function WorkPageMain({getIsLoading}: WorkPageMainProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [generalPrompt, setGeneralPrompt] = useState<string | null>(null);
    const [nativeLanguage, setNativeLanguage] = useState<string | null>(null);
    const [selectedNativeLanguage, setSelectedNativeLanguage] = useState<LanguageOption | null>(null);
    const [languageToLearn, setLanguageToLearn] = useState<string | null>(null);
    const [selectedLanguageToLearn, setSelectedLanguageToLearn] = useState<LanguageOption | null>(null);
    const [languageResult, setLanguageResult] = useState<{native: string; target: string} | null>(null);
    const [exerciseNumber, setExerciseNumber] = useState<string>("5");
    const [exercise, setExercise] = useState<ExerciseType>("translation");
    const [difficulty, setDifficulty] = useState("easy");
    const [currentText, setCurrentText] = useState<string | null>(null);
    const [blanksArray, setBlanksArray] = useState<BlanksArray[] | null>(null);
    const [cardsArray, setCardsArray] = useState<FlipCardType[] | null>(null);
    const [quizCards, setQuizCards] = useState<QuizCard[] | null>(null);
    const [currentPhoto, setCurrentPhoto] = useState<PhotoType | null>(null);
    const [currentTopic, setCurrentTopic] = useState<EssayType | null>(null);
    const anchorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            try {
                getIsLoading(true);
                const userId = localStorage.getItem("currentUserId");
                if (userId) {
                    const user = await findUserById(userId);
                    setCurrentUser(user);
                    const foundNativeLanguage = languageOptions.find(
                        (lang) => lang.value === user.nativeLanguage
                    );
                    const foundLanguageToLearn = languageOptions.find(
                        (lang) => lang.value === user.languageToLearn
                    );
                    if (foundNativeLanguage && foundLanguageToLearn) {
                        setSelectedNativeLanguage(foundNativeLanguage);
                        setSelectedLanguageToLearn(foundLanguageToLearn);
                    }
                }
            } catch (err) {
                setCurrentUser(null);
            } finally {
                getIsLoading(false);
            }
        })();
    }, []);

    const generateMore = () => {
        handleGenerateClick();
    }

    const handleGenerateClick = () => {
        if (!currentUser) {
            return;
        }

        setCurrentText(null);
        setBlanksArray(null);
        setCardsArray(null);
        setQuizCards(null);
        setCurrentPhoto(null);
        setCurrentTopic(null);

        const propertiesObj: DefaultPropsForGeneration = {
            generalPrompt: generalPrompt,
            nativeLanguage: nativeLanguage,
            selectedNativeLanguage: selectedNativeLanguage,
            languageToLearn: languageToLearn,
            selectedLanguageToLearn: selectedLanguageToLearn,
            exerciseNumber: exerciseNumber,
            exercise: exercise,
            difficulty: difficulty,
            level: currentUser?.level,
            interests: currentUser.interests,
            goals: currentUser.goals
        };

        getIsLoading(true);
        switch (exercise) {
            case "translation": {
                generateText(propertiesObj).then(data => {
                    const parsed = JSON.parse(data.data.output_text);
                    setCurrentText(parsed.text);
                    setLanguageResult(parsed.languages);
                    getIsLoading(false);
                    setTimeout(() => {
                        anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                });
                break;
            } case "blanks": {
                generateBlanks(propertiesObj).then(data => {
                    const parsed = JSON.parse(data.data.output_text);
                    setBlanksArray(parsed);
                    getIsLoading(false);
                    setTimeout(() => {
                        anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                });
                break;
            } case "cards": {
                generateCards(propertiesObj).then(data => {
                    const parsed = JSON.parse(data.data.output_text);
                    setCardsArray(parsed);
                    getIsLoading(false);
                    setTimeout(() => {
                        anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                });
                break;
            } case "quiz": {
                generateQuizCards(propertiesObj).then(data => {
                    const parsed = JSON.parse(data.data.output_text);
                    setQuizCards(parsed);
                    getIsLoading(false);
                    setTimeout(() => {
                        anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                });
                break;
            } case "imageDesc": {
                getRandomImage()
                    .then(data => {
                        const photo: PhotoType = {
                            src: data.src.landscape,
                            alt: data.alt,
                        }
                        setCurrentPhoto(photo);
                        getIsLoading(false);
                        setTimeout(() => {
                            anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                        }, 100)
                    })
                    .catch(err => console.log(err));
                break;
            } case "essay": {
                generateEssayTopic(propertiesObj).then(data => {
                    const parsed = JSON.parse(data.data.output_text)
                    setCurrentTopic(parsed);
                    getIsLoading(false);
                    setTimeout(() => {
                        anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                });
                break;
            }
        }
    };

    return (
        <>
            <div className="flex-1 h-full mt-5">
                <section
                    className="md:py-5 py-2 px-5 font-bold container mx-auto md:max-w-[75vw] lg:max-w-[55vw] shadow-md"
                >
                    <div className="space-y-3 mb-5">
                        <div className="flex justify-between items-center">
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                What do you want to generate?
                            </label>
                            <CustomTooltip type="information" />
                        </div>
                        <textarea onInput={(event) => {
                            setGeneralPrompt(event.currentTarget.value);
                        }}
                                  disabled={exercise === "imageDesc"}
                                  id="message" rows={6}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                  disabled:cursor-not-allowed border-gray-300 focus:ring-blue-500
                                  disabled:bg-gray-200 disabled:brightness-90 focus:border-blue-500"
                                  placeholder="For example: generate exercises on topic 'How i spent my summer'. It should be for A-2 speaking level">
                        </textarea>
                        <div className="flex items-center justify-around flex-wrap gap-5">
                            <div className="flex-col justify-center items-center w-full sm:w-auto">
                                <label htmlFor="message"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    I speak:
                                </label>
                                {selectedNativeLanguage && (
                                    <Select isSearchable={false} className="md:w-[160px] text-center"
                                            defaultValue={selectedNativeLanguage}
                                            onChange={(option) => {
                                                setNativeLanguage(option!.value);
                                            }} options={languageOptions}
                                    />
                                )}
                                {!selectedNativeLanguage && (
                                    <Select isSearchable={false} className="md:w-[160px] text-center"
                                            onChange={(option) => {
                                                setNativeLanguage(option!.value);
                                            }} options={languageOptions}
                                    />
                                )}
                            </div>
                            <div className="flex-col justify-center items-center w-full sm:w-auto">
                                <label htmlFor="message"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    I want to learn:
                                </label>
                                {selectedLanguageToLearn && (
                                    <Select isSearchable={false} className="md:w-[160px] text-center"
                                            defaultValue={selectedLanguageToLearn}
                                            onChange={(option) => {
                                                setLanguageToLearn(option!.value);
                                            }} options={languageOptions}
                                    />
                                )}
                                {!selectedLanguageToLearn && (
                                    <Select isSearchable={false} className="md:w-[160px] text-center"
                                            onChange={(option) => {
                                                setLanguageToLearn(option!.value);
                                            }} options={languageOptions}
                                    />
                                )}
                            </div>
                            <div className="w-full md:w-[200px]">
                                <label htmlFor="visitors"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Select number of exercises:
                                </label>
                                <input type="number" id="visitors" max={10} min={1} defaultValue={5}
                                       disabled={exercise === "translation" || exercise === "imageDesc" || exercise === "essay"}
                                       onInput={(e) => setExerciseNumber(e.currentTarget.value)}
                                       className="bg-gray-50 border py-2 border-gray-300 text-gray-900 text-sm rounded-lg disabled:cursor-not-allowed
                                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:brightness-90"
                                />
                            </div>
                            <div className="w-full flex flex-col items-center sm:block space-y-6">
                                <div className="flex flex-wrap gap-3 justify-between items-end">
                                    <div className="w-full md:max-w-1/2 mx-auto md:mx-0">
                                        <DifficultyChoose value={difficulty} onChange={setDifficulty} />
                                    </div>
                                    <HintCard />
                                </div>
                                <Box className="w-[300px] sm:w-auto">
                                    <label htmlFor="visitors"
                                           className="block mb-2 text-sm font-medium text-gray-900">
                                        Select type of exercises:
                                    </label>
                                    <RadioCards.Root defaultValue="translation"
                                                     columns={{initial: "1", sm: "3"}}
                                                     onValueChange={(value) => setExercise(value as ExerciseType)}
                                    >
                                        <RadioCards.Item value="translation">
                                            <Flex direction="column" width="100%">
                                                <p className="font-bold">Translate Text</p>
                                                <p>Practice translating sentences between your native and target language.</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="blanks">
                                            <Flex direction="column" width="100%">
                                                <p className="font-bold">Fill in the Blanks</p>
                                                <p>Complete sentences by filling in missing words to reinforce grammar and vocabulary.</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="cards">
                                            <Flex direction="column" width="100%">
                                                <p className="font-bold">Flip Cards</p>
                                                <p>Practice vocabulary or phrases by flipping cards to reveal translations or answers.</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="quiz">
                                            <Flex direction="column" width="100%">
                                                <p className="font-bold">Quiz</p>
                                                <p>Answer multiple-choice questions to test your language knowledge.</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="imageDesc">
                                            <Flex direction="column" width="100%">
                                                <p className="font-bold">Describe an image</p>
                                                <p>Look at the picture and write a few sentences describing what you see.</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="essay">
                                            <Flex direction="column" width="100%">
                                                <p className="font-bold">Write an essay</p>
                                                <p>Write a short essay on the given topic to practice your writing skills.</p>
                                            </Flex>
                                        </RadioCards.Item>
                                    </RadioCards.Root>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-5 sm:mb-0 w-full flex justify-end">
                        <button className="button flex items-center gap-2" onClick={handleGenerateClick}>
                            Generate <FaMagic />
                        </button>
                    </div>
                </section>
                <section id="exercise-area" className={`${currentText || blanksArray || cardsArray || 
                quizCards || currentPhoto || currentTopic ? 
                    "duration-500 font-bold mx-auto max-w-[98%] md:max-w-[75vw] lg:max-w-[55vw] shadow-md my-3"
                    : "h-0 overflow-hidden"}`} ref={anchorRef}>
                    {currentText && (
                        <TextTranslation getIsLoading={getIsLoading}
                                         text={currentText}
                                         nativeLanguage={languageResult?.native as string}
                                         languageToLearn={languageResult?.target as string}
                                         generateMore={generateMore}
                                         difficulty={difficulty}
                        />
                    )}
                    {blanksArray && (
                        <FillTheBlanks blanksArray={blanksArray}
                                       generateMore={generateMore}
                                       difficulty={difficulty}
                        />
                    )}
                    {cardsArray && (
                        <CardsFlipExercise generateMore={generateMore}
                                           flipCards={cardsArray}
                                           difficulty={difficulty}
                        />
                    )}
                    {quizCards && (
                        <QuizExercise generateMore={generateMore}
                                           quizCards={quizCards}
                                           difficulty={difficulty}
                        />
                    )}
                    {currentPhoto && (
                        <DescribeImageExercise generateMore={generateMore}
                                               image={currentPhoto}
                                               nativeLanguage={languageResult?.native as string}
                                               languageToLearn={languageResult?.target as string}
                                               difficulty={difficulty}
                                               getIsLoading={getIsLoading}
                        />
                    )}
                    {currentTopic && (
                        <EssayExercise generateMore={generateMore}
                                       nativeLanguage={languageResult?.native as string}
                                       languageToLearn={languageResult?.target as string}
                                       difficulty={difficulty}
                                       getIsLoading={getIsLoading}
                                       topic={currentTopic}
                        />
                    )}
                </section>
            </div>
        </>
    )
}

export default WorkPageMain
