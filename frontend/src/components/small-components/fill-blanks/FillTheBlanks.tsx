import { useRef, useState } from "react";
import { Separator } from "radix-ui";
import type { Blank } from "../../../types";
import { CustomTooltip } from "../CustomTooltip.tsx";
import { BlanksSelectAnswer } from "./BlanksSelectAnswer.tsx";
import { PiShootingStarBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";

type FillTheBlanksProps = {
    generateMore: () => void;
    blanksArray: Blank[];
    difficulty: string;
};

export const FillTheBlanks = ({ blanksArray, generateMore, difficulty }: FillTheBlanksProps) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const { t } = useTranslation();

    const checkAnswers = () => {
        setShowExplanation(!showExplanation);
        setTimeout(() => {
            anchorRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 10);
    };

    const handleReset = () => {
        setReset(true);
        setTimeout(() => {
            setReset(false);
        }, 50);
        anchorRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div
                className="bg-gradient-to-r from-blue-600 to-indigo-700 py-2 px-3 sm:py-3 sm:px-6 rounded-t-xl"
                ref={anchorRef}
            >
                <h3 className="text-white text-lg sm:text-xl font-bold">{t("blanks.title")}</h3>
                <p className="text-blue-100 mt-1 text-sm sm:text-lg">{t("blanks.subtitle")}</p>
            </div>
            <div className="relative flex items-center mt-4 mb-5 mx-4 sm:mx-6 md:mx-8">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                <div>
                    <span className="text-blue-900 font-extrabold text-md sm:text-lg flex items-center gap-2">
                        {t("blanks.mainInstruction")}
                    </span>
                    <div className="mt-1 text-blue-500 text-xs italic tracking-wide">
                        {t("blanks.hint")}
                    </div>
                </div>
            </div>
            <div className="space-y-5 text-sm md:text-lg font-medium md:py-3 py-2 px-5">
                {blanksArray.map((task, index) => {
                    const parts = task.sentence.split(" ");
                    return (
                        <div key={index}>
                            <div className="flex flex-wrap gap-[5px] text-[1rem] items-center">
                                {parts.map((word, index) => {
                                    if (/(___)([.,?!-])?$/.test(word)) {
                                        return (
                                            <div key={index}>
                                                <BlanksSelectAnswer
                                                    task={reset ? null : task}
                                                    showExplanation={showExplanation}
                                                />
                                            </div>
                                        );
                                    } else {
                                        return <span key={index}>{word + " "}</span>;
                                    }
                                })}
                                {showExplanation && (
                                    <CustomTooltip
                                        type="hint"
                                        text={task.explanation}
                                    />
                                )}
                            </div>
                            <div className="w-full">
                                <Separator.Root className="my-[15px] bg-gray-700 data-[orientation=horizontal]:h-px" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex w-full sm:justify-end justify-center">
                <div className="flex gap-3 p-0 mb-5">
                    <button
                        type="button"
                        onClick={checkAnswers}
                        className="text-blue-700 border-blue-700 border focus:outline-none
                            hover:bg-blue-50 font-medium rounded-lg text-sm px-2 py-1 sm:px-4
                            sm:py-2 text-center cursor-pointer"
                    >
                        {t("blanks.checkAnswers")}
                    </button>
                    <button
                        type="button"
                        onClick={generateMore}
                        className="text-white bg-blue-700 hover:bg-blue-800
                             font-medium rounded-lg text-sm px-2 py-1 sm:px-4 sm:py-2 sm:me-3
                            focus:outline-none cursor-pointer flex items-center gap-2"
                    >
                        {t("blanks.generateMore")}
                        <PiShootingStarBold className="text-[14px]" />
                    </button>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">
                        {t("blanks.difficulty")}
                        <span className="font-bold">{" " + `${difficulty}`}</span>
                    </span>
                    <div>
                        <button
                            onClick={handleReset}
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
                            {t("blanks.reset")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
