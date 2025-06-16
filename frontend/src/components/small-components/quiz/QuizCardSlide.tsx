import { type PropsWithChildren, useState } from "react";
import type { QuizCard } from "../../../types";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { CustomTooltip } from "../CustomTooltip.tsx";

type QuizCardSlideProps = PropsWithChildren & { card: QuizCard; number: number };

const letters = ["A", "B", "C", "D"];

export const QuizCardSlide = (props: QuizCardSlideProps) => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setShowAnswer(true);
        setCurrentIndex(index);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 items-start">
                <div className="h-6 w-6 rounded-full bg-white inline-flex justify-center items-center mt-0.5">
                    <p className="font-bold text-gray-700">{props.number + 1}</p>
                </div>
                <div className="max-w-11/12 flex-1 flex items-center gap-3">
                    <p className="text-white font-bold">{props.card.question}</p>
                    {showAnswer && (
                        <CustomTooltip
                            type="hint"
                            text={props.card.explanation}
                        />
                    )}
                </div>
            </div>
            <div className="space-y-3 mt-4">
                {props.card.options.map((option, index) => {
                    const isCorrect = option === props.card.answer;
                    const isSelected = index === currentIndex;

                    let borderClass = "border border-transparent";
                    let textClass = "text-gray-900";

                    if (showAnswer) {
                        if (isCorrect) {
                            borderClass = "border-2 border-blue-700 shadow-md shadow-blue-700";
                            textClass = "text-blue-700";
                        } else if (isSelected && !isCorrect) {
                            borderClass = "border-2 border-neutral-400";
                            textClass = "text-neutral-500";
                        }
                    }

                    return (
                        <button
                            key={option}
                            onClick={() => {
                                handleClick(index);
                            }}
                            className={`flex gap-2 p-2 rounded-md w-full cursor-pointer bg-white items-center ${borderClass}`}
                            disabled={showAnswer}
                        >
                            <span
                                className={`${textClass} text-start`}
                            >{`${letters[index]}.`}</span>
                            <span className={`${textClass} text-start`}>{option}</span>
                            {showAnswer && isCorrect && <TiTick className="text-blue-700" />}
                            {showAnswer && isSelected && !isCorrect && (
                                <RxCross2 className="text-neutral-500" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
