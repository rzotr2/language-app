import { useRef, useState } from "react";
import type { FlipCardType } from "../../../types";
import FlipCard from "./FlipCard.tsx";
import { PiShootingStarBold } from "react-icons/pi";

type CardsFlipProps = {
    generateMore: () => void;
    flipCards: FlipCardType[];
    difficulty: string;
};

export const CardsFlipExercise = ({ flipCards, generateMore, difficulty }: CardsFlipProps) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [reset, setReset] = useState<boolean>(false);

    const handleReset = () => {
        setReset(true);
        setTimeout(() => {
            setReset(false);
            anchorRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 10);
    };

    return (
        <>
            <div
                className="bg-gradient-to-r from-blue-600 to-indigo-700 py-2 px-3 sm:py-3 sm:px-6 rounded-t-xl"
                ref={anchorRef}
            >
                <h3 className="text-white text-lg sm:text-xl font-bold">Flip cards</h3>
                <p className="text-blue-100 mt-1 text-sm sm:text-lg">
                    Translate text into your native language
                </p>
            </div>
            <div className="relative flex items-center mt-4 mb-5 mx-4 sm:mx-6 md:mx-8">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                <div>
                    <span className="text-blue-900 font-extrabold text-md sm:text-lg flex items-center gap-2">
                        Test your memory and learn new words with flashcards.
                    </span>
                    <div className="mt-1 text-blue-500 text-xs italic tracking-wide">
                        Try to recall the answer before flipping each card
                    </div>
                </div>
            </div>
            <div
                className="space-y-1 text-sm md:text-lg mb-5 mx-3 p-5 bg-[linear-gradient(135deg,_#f5f7fa_0%,_#c3cfe2_100%)]
                    font-medium gap-3 flex flex-wrap"
            >
                {flipCards.map((flipcard, index) => {
                    return (
                        <FlipCard
                            key={index}
                            word={flipcard.word}
                            translation={flipcard.translation}
                            meaning={flipcard.meaning}
                            example={flipcard.example}
                            transcription={flipcard.transcription}
                            reset={reset}
                        />
                    );
                })}
            </div>
            <div className="flex w-full justify-center sm:justify-end my-3">
                <div className="flex gap-3 p-0">
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
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
