import { useRef, useState } from "react";
import type { QuizCard } from "../../../types";
import { PiShootingStarBold } from "react-icons/pi";
import { QuizCardSlider } from "./QuizCardSlider.tsx";
import { QuizCardSlide } from "./QuizCardSlide.tsx";
import { useTranslation } from "react-i18next";

type QuizExerciseProps = {
    quizCards: QuizCard[];
    generateMore: () => void;
    difficulty: string;
};

export const QuizExercise = ({ quizCards, generateMore, difficulty }: QuizExerciseProps) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [slideNumber, setSlideNumber] = useState<number>(0);
    const { t } = useTranslation();

    const handlePerv = () => {
        setSlideNumber(slideNumber === 0 ? slideNumber : slideNumber - 1);
    };
    const handleNext = () => {
        setSlideNumber(slideNumber === quizCards.length - 1 ? slideNumber : slideNumber + 1);
    };

    const handleReset = () => {
        setSlideNumber(0);
    };

    return (
        <>
            <div
                className="bg-gradient-to-r from-blue-600 to-indigo-700 py-2 px-3 sm:py-3 sm:px-6 rounded-t-xl"
                ref={anchorRef}
            >
                <h3 className="text-white text-lg sm:text-xl font-bold">{t("quiz.title")}</h3>
                <p className="text-blue-100 mt-1 text-sm sm:text-lg">{t("quiz.subtitle")}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 p-2 sm:p-4">
                <div
                    className="space-y-1 text-sm md:text-lg p-2 sm:p-3 font-medium gap-3 bg-gradient-to-r
                    from-blue-500 to-indigo-500 mt-4 rounded-xl"
                >
                    <QuizCardSlider activeSlide={slideNumber}>
                        {quizCards.map((card, index) => {
                            return (
                                <QuizCardSlide
                                    card={card}
                                    key={index}
                                    number={index}
                                />
                            );
                        })}
                    </QuizCardSlider>
                </div>
                <div className="flex justify-between items-center my-4 sm:mx-3 text-white">
                    {slideNumber === 0 ? (
                        <button
                            type="button"
                            onClick={handlePerv}
                            disabled={true}
                            className="text-gray-900 bg-gray-300 border border-gray-300 focus:outline-none
                                    cursor-not-allowed font-medium rounded-lg text-sm py-1 w-[70px] sm:w-[100px] sm:py-2"
                        >
                            {t("quiz.previous")}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handlePerv}
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none cursor-pointer
                            hover:bg-gray-100 font-medium rounded-lg text-sm py-1 w-[70px] sm:w-[100px] sm:py-2"
                        >
                            {t("quiz.previous")}
                        </button>
                    )}
                    <div className="text-sm sm:text-md cursor-default">
                        <span>{t("quiz.question") + " "}</span>
                        <span>{`${slideNumber + 1} ${t("quiz.of")} ${quizCards.length}`}</span>
                    </div>
                    {slideNumber === quizCards.length - 1 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={true}
                            className="text-gray-900 bg-gray-300 border border-gray-300 focus:outline-none
                                    cursor-not-allowed font-medium rounded-lg text-sm py-1 w-[70px] sm:w-[100px] sm:py-2"
                        >
                            {t("quiz.next")}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none cursor-pointer
                            hover:bg-gray-100 font-medium rounded-lg text-sm py-1 w-[70px] sm:w-[100px] sm:py-2"
                        >
                            {t("quiz.next")}
                        </button>
                    )}
                </div>
                <div className="flex w-full justify-center sm:justify-end mt-5 mb-3">
                    <div className="flex gap-3 p-0">
                        <button
                            type="button"
                            onClick={generateMore}
                            className="text-white bg-blue-700 hover:bg-blue-800
                             font-medium rounded-lg text-sm px-2 py-1.5 sm:px-4 sm:py-2.5
                            focus:outline-none cursor-pointer flex items-center gap-2 sm:me-3"
                        >
                            {t("quiz.generateMore")}
                            <PiShootingStarBold className="text-[14px]" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-sm text-gray-500 font-medium">
                            {t("quiz.difficulty")}
                            <span className="font-bold">{" " + `${difficulty}`}</span>
                        </span>
                    </div>
                    <div>
                        <button
                            onClick={handleReset}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium mr-4"
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
                            {t("return")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
