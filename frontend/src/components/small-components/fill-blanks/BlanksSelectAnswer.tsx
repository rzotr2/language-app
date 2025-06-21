import { Select } from "radix-ui";
import { FaChevronDown } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import type { Blank } from "../../../types";

type BlanksSelectAnswerProps = {
    showExplanation: boolean;
    task: Blank | null;
};

export const BlanksSelectAnswer = ({ showExplanation, task }: BlanksSelectAnswerProps) => {
    if (!task) {
        return;
    }

    const shuffleArray = (array: string[]) => {
        return array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };

    const shuffledOptions = shuffleArray(task.options);

    return (
        <Select.Root disabled={showExplanation}>
            {showExplanation ? (
                <Select.Trigger className="text-sm sm:text-lg bg-gray-300 px-2 rounded-md flex items-center gap-2 text-red-700">
                    <Select.Value
                        placeholder="_____"
                        className="font-medium "
                    />
                </Select.Trigger>
            ) : (
                <Select.Trigger className="text-sm sm:text-lg bg-gray-300 px-2 rounded-md flex items-center gap-1">
                    <Select.Value
                        placeholder="_____"
                        className="font-medium"
                    />
                    <FaChevronDown className="text-sm" />
                </Select.Trigger>
            )}
            <Select.Portal>
                <Select.Content className="text-sm sm:text-lg shadow-xl bg-gray-300 rounded-md">
                    <Select.Viewport>
                        {shuffledOptions.map((option, idx) => (
                            <Select.Item
                                key={idx}
                                value={option}
                                className="hover:bg-gray-200 cursor-pointer px-3"
                            >
                                {showExplanation && (
                                    <>
                                        <Select.ItemText className="font-medium">
                                            <span
                                                className={
                                                    option === task.answer
                                                        ? "text-blue-700" // або text-primary-700, якщо у tailwind є кастомний primary
                                                        : "text-neutral-500"
                                                }
                                            >
                                                {option === task.answer ? (
                                                    <div className="flex items-center leading-0 py-1 gap-1">
                                                        <span>{option}</span>
                                                        <TiTick />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center leading-0 py-1 gap-1">
                                                        <span className="text-neutral-500">
                                                            {option}
                                                        </span>
                                                        <span>
                                                            <RxCross2 />
                                                        </span>
                                                    </div>
                                                )}
                                            </span>
                                        </Select.ItemText>
                                    </>
                                )}
                                {!showExplanation && (
                                    <Select.ItemText className="font-medium">
                                        {option}
                                    </Select.ItemText>
                                )}
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};
