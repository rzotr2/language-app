import { useRef, useState } from "react";
import { PiShootingStarBold } from "react-icons/pi";
import { Collapsible, Separator } from "radix-ui";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { CheckEssayProps, EssayType } from "../../../types";
import { checkEssay } from "../../../services/ai.ts";

type EssayExerciseProps = {
    difficulty: string;
    getIsLoading: (isLoading: boolean) => void;
    generateMore: () => void;
    languageToLearn: string;
    nativeLanguage: string;
    topic: EssayType;
};

export const EssayExercise = ({
    getIsLoading,
    generateMore,
    difficulty,
    languageToLearn,
    nativeLanguage,
    topic,
}: EssayExerciseProps) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [currentEssay, setCurrentEssay] = useState<string | null>(null);
    const [checkEssayResultMyText, setCheckEssayResultMyText] = useState<string | null>(null);
    const [checkEssayResultGrade, setCheckEssayResultGrade] = useState<string | null>(null);
    const [checkEssayResultAiVersion, setCheckEssayResultAiVersion] = useState<string | null>(null);

    const handleCheckEssayClick = () => {
        const propertiesObj: CheckEssayProps = {
            nativeLanguage: nativeLanguage,
            languageToLearn: languageToLearn,
            text: currentEssay,
            topic: topic.topic,
        };

        if (currentEssay) {
            getIsLoading(true);
            checkEssay(propertiesObj).then((data) => {
                const parsed = JSON.parse(data.data.output_text);
                setCheckEssayResultMyText(parsed.myText);
                setCheckEssayResultGrade(parsed.problem);
                setCheckEssayResultAiVersion(parsed.aiTextVersion);
                getIsLoading(false);
                setTimeout(() => {
                    anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
            });
        } else {
            setCheckEssayResultMyText("You should enter something");
        }
    };

    return (
        <>
            <div
                className="bg-gradient-to-r from-blue-600 to-indigo-700 py-2 px-3 sm:py-3 sm:px-6 rounded-t-xl"
                ref={anchorRef}
            >
                <h3 className="text-white text-lg sm:text-xl font-bold">Essay Writing</h3>
                <p className="text-blue-100 mt-1 text-sm sm:text-lg">
                    Write an essay expressing your thoughts and arguments.
                </p>
            </div>
            <div className="relative flex items-center mt-4 mb-5 mx-4 sm:mx-6 md:mx-8">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                <div>
                    <span className="text-blue-900 font-extrabold text-md sm:text-lg flex items-center gap-2">
                        Express your thoughts and arguments in a well-structured essay.
                    </span>
                    <div className="mt-1 text-blue-500 text-xs italic tracking-wide">
                        Organize your ideas clearly and support them with examples.
                    </div>
                </div>
            </div>
            <div className="space-y-3 px-3 sm:px-5 mt-3 font-medium">
                <p className="mt-2">{topic.topic}</p>
                <ul>
                    {topic.plan.map((elem) => {
                        return <li>- {elem}</li>;
                    })}
                </ul>
                <textarea
                    id="message"
                    rows={6}
                    value={currentEssay === null ? "" : currentEssay}
                    onInput={(e) => setCurrentEssay(e.currentTarget.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                  border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-normal mt-1.5"
                    placeholder="Write your essay here. Start with an introduction, develop your main ideas in separate paragraphs, and finish with a conclusion. Use linking words and pay attention to structure, clarity, and grammar."
                ></textarea>
                {checkEssayResultGrade && checkEssayResultAiVersion && (
                    <div
                        ref={anchorRef}
                        className="my-6 space-y-5 text-sm sm:text-[16px] font-normal"
                    >
                        <div>
                            <p className="font-bold pb-1.5">My version:</p>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {checkEssayResultMyText}
                            </Markdown>
                        </div>
                        <Separator.Root className="my-[15px] bg-gray-700 data-[orientation=horizontal]:h-px" />
                        <div>
                            <p className="font-bold pb-1.5">Review result</p>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {checkEssayResultGrade}
                            </Markdown>
                        </div>
                        <Separator.Root className="my-[15px] bg-gray-700 data-[orientation=horizontal]:h-px" />
                        <div>
                            <p className="font-bold pb-1.5">
                                How would AI write essay on this topic:
                            </p>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {checkEssayResultAiVersion}
                            </Markdown>
                        </div>
                    </div>
                )}
                <Collapsible.Root>
                    <Collapsible.Content
                        className="CollapsibleContent text-sm bg-blue-50
                         text-blue-900 rounded-b-md p-4 space-y-3"
                    >
                        <div>
                            <span className="font-semibold">1. General Impression:</span>
                            <div className="ml-4">
                                What is the overall scene? (indoor/outdoor, type of place)
                            </div>
                        </div>
                        <div>
                            <span className="font-semibold">2. People and Objects:</span>
                            <div className="ml-4">
                                Who or what is in the picture? (number of people, main objects)
                            </div>
                        </div>
                        <div>
                            <span className="font-semibold">3. Actions:</span>
                            <div className="ml-4">
                                What are the people doing? (describe activities or interactions)
                            </div>
                        </div>
                        <div>
                            <span className="font-semibold">4. Appearance and Details:</span>
                            <div className="ml-4">
                                What do the people look like? (clothes, age, mood, posture)
                                <br />
                                What details stand out? (colors, weather, time of day, background
                                elements)
                            </div>
                        </div>
                        <div>
                            <span className="font-semibold">5. Atmosphere:</span>
                            <div className="ml-4">
                                What is the mood or feeling of the image? (happy, busy, calm, etc.)
                            </div>
                        </div>
                        <div>
                            <span className="font-semibold">6. Personal Opinion (optional):</span>
                            <div className="ml-4">
                                What do you think about the image? (interesting, surprising, etc.)
                            </div>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
                <div className="flex w-full justify-center sm:justify-end py-3">
                    <div className="flex gap-3 p-0">
                        <button
                            type="button"
                            onClick={handleCheckEssayClick}
                            className="text-blue-700 border-blue-700 border focus:outline-none
                            hover:bg-blue-50 font-medium rounded-lg text-sm px-2 py-1.5 sm:px-4
                            sm:py-2.5 text-center cursor-pointer"
                        >
                            Check answers
                        </button>
                        <button
                            type="button"
                            onClick={generateMore}
                            className="text-white bg-blue-700 hover:bg-blue-800
                             font-medium rounded-lg text-sm px-2 py-1.5 sm:px-4 sm:py-2.5
                            focus:outline-none cursor-pointer flex items-center gap-2"
                        >
                            Generate more
                            <PiShootingStarBold className="text-[14px]" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-sm text-gray-500 font-medium">
                            Difficulty:
                            <span className="font-bold">{" " + `${difficulty}`}</span>
                        </span>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setCurrentEssay(null);
                                setCheckEssayResultMyText(null);
                                setCheckEssayResultGrade(null);
                                setCheckEssayResultAiVersion(null);
                                anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 inline mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
