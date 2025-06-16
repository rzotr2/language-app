import { IoMdClose, IoMdInformationCircleOutline } from "react-icons/io";
import { useRef, useState } from "react";
import { checkTranslation } from "../../../services/ai.ts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Separator } from "radix-ui";
import type { CheckTranslationProps } from "../../../types";
import { PiShootingStarBold } from "react-icons/pi";

type ExerciseSectionProps = {
    text: string;
    getIsLoading: (isLoading: boolean) => void;
    languageToLearn: string;
    nativeLanguage: string;
    generateMore: () => void;
    difficulty: string;
};

export const TextTranslation = ({
    text,
    getIsLoading,
    languageToLearn,
    nativeLanguage,
    generateMore,
    difficulty,
}: ExerciseSectionProps) => {
    const [closed, setClosed] = useState<boolean>(false);
    const [translationText, setTranslationText] = useState<string | null>(null);
    const [checkTextResultMyText, setCheckTextResultMyText] = useState<string | null>(null);
    const [checkTextResultGrade, setCheckTextResultGrade] = useState<string | null>(null);
    const [checkTextResultAiVersion, setCheckTextResultAiVersion] = useState<string | null>(null);
    const anchorRef = useRef<HTMLDivElement>(null);

    const handleCheckTranslationClick = () => {
        const propertiesObj: CheckTranslationProps = {
            nativeLanguage: nativeLanguage,
            languageToLearn: languageToLearn,
            translationText: translationText,
            text: text,
        };

        if (translationText) {
            getIsLoading(true);
            checkTranslation(propertiesObj).then((data) => {
                const parsed = JSON.parse(data.data.output_text);
                setCheckTextResultMyText(parsed.myText);
                setCheckTextResultGrade(parsed.problem);
                setCheckTextResultAiVersion(parsed.aiTextVersion);
                getIsLoading(false);
                setTimeout(() => {
                    anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
            });
        } else {
            setCheckTextResultMyText("You should enter something");
        }
    };

    return (
        <>
            <div
                className="bg-gradient-to-r from-blue-600 to-indigo-700 py-2 px-3 sm:py-3 sm:px-6 rounded-t-xl"
                ref={anchorRef}
            >
                <h3 className="text-white text-lg sm:text-xl font-bold">Text translation</h3>
                <p className="text-blue-100 mt-1 text-sm sm:text-lg">
                    Translate text into your native language
                </p>
            </div>
            <div className="relative flex items-center mt-4 mb-5 mx-4 sm:mx-6 md:mx-8">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                <div>
                    <span className="text-blue-900 font-extrabold text-md sm:text-lg flex items-center gap-2">
                        Focus on meaning, clarity, and natural language.
                    </span>
                    <div className="mt-1 text-blue-500 text-xs italic tracking-wide">
                        Translate the message, not just the words.
                    </div>
                </div>
            </div>
            <div className="space-y-5 px-3">
                <p className="font-normal text-sm sm:text-md md:text-lg bg-blue-50 rounded-lg px-3 py-2">
                    {text}
                </p>
                {!closed && (
                    <div className="flex items-center w-full bg-blue-50 py-2.5 px-4 rounded-lg">
                        <div className="mr-2 text-xl text-blue-700 flex-shrink-0">
                            <IoMdInformationCircleOutline />
                        </div>
                        <p className="flex-1 font-normal text-blue-700 text-sm">
                            It is better to use device with a big screen for this exercise.
                        </p>
                        <button
                            onClick={() => setClosed(true)}
                            className="ml-2 text-xl text-blue-700 cursor-pointer focus:outline-none"
                            aria-label="Close"
                            type="button"
                        >
                            <IoMdClose />
                        </button>
                    </div>
                )}
                <label
                    htmlFor="message"
                    className="font-bold text-gray-900"
                >
                    Enter your translation:
                </label>
                <textarea
                    id="message"
                    rows={6}
                    value={translationText === null ? "" : translationText}
                    onInput={(e) => setTranslationText(e.currentTarget.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                  border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-normal mt-1.5"
                    placeholder="Write your translation here. Focus on conveying the meaning clearly and naturally, not just translating word for word"
                ></textarea>
                {checkTextResultGrade && checkTextResultAiVersion && (
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
                                {checkTextResultMyText}
                            </Markdown>
                        </div>
                        <Separator.Root className="my-[15px] bg-gray-700 data-[orientation=horizontal]:h-px" />
                        <div>
                            <p className="font-bold pb-1.5">Review result</p>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {checkTextResultGrade}
                            </Markdown>
                        </div>
                        <Separator.Root className="my-[15px] bg-gray-700 data-[orientation=horizontal]:h-px" />
                        <div>
                            <p className="font-bold pb-1.5">How would AI translate this text:</p>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {checkTextResultAiVersion}
                            </Markdown>
                        </div>
                    </div>
                )}
                {!checkTextResultGrade && !checkTextResultAiVersion && (
                    <div
                        ref={anchorRef}
                        className="my-4"
                    >
                        <Markdown remarkPlugins={[remarkGfm]}>{checkTextResultMyText}</Markdown>
                    </div>
                )}
                <div className="flex w-full justify-center sm:justify-end">
                    <div className="flex gap-3 p-0">
                        <button
                            type="button"
                            onClick={handleCheckTranslationClick}
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
                            focus:outline-none cursor-pointer flex items-center gap-2 sm:me-3"
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
                                setTranslationText(null);
                                setCheckTextResultMyText(null);
                                setCheckTextResultGrade(null);
                                setCheckTextResultAiVersion(null);
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
