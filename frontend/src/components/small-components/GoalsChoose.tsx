import { useState } from "react";
import { Box, Flex, RadioCards } from "@radix-ui/themes";
import { IoChevronBackOutline } from "react-icons/io5";

type GoalsChooseProps = {
    getSelectedGoal: (selectedLevel?: string, back?: boolean) => void;
    show: boolean;
};

export default function GoalsChoose(props: GoalsChooseProps) {
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

    return (
        <div
            className={`${props.show ? "sm:h-[500px] flex flex-col justify-between" : "w-0 h-0 overflow-hidden"}`}
        >
            <h3 className="text-sm mb-4 md:mb-7 md:text-xl font-semibold">
                Why do you need learning language?
            </h3>
            <div className="mb-6 md:w-2/3 mx-auto">
                <Box maxWidth="">
                    <RadioCards.Root
                        defaultValue="1"
                        columns={{ initial: "1", sm: "2" }}
                        onValueChange={(value) => setSelectedGoal(value)}
                    >
                        <RadioCards.Item value="Travel and Everyday Conversation">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">🧳 Travel & Everyday Conversation</p>
                                <p>
                                    Navigate real-world scenarios like booking a hotel or ordering
                                    food.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Business and Professional Communication">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">
                                    💼 Business & Professional Communication
                                </p>
                                <p>Polish email writing, presentations, and workplace dialogue.</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Exam Preparation">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">📝 Exam Preparation</p>
                                <p>
                                    Practice strategies and sample tests to hit your target score.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Academic and Study Skills">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">📚 Academic & Study Skills</p>
                                <p>Improve reading, essay writing, and lecture comprehension.</p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Personal Enrichment and Hobbies">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">🎨 Personal Enrichment & Hobbies</p>
                                <p>
                                    Learn through your favorite pastimes like music, art, or travel.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Listening and Pronunciation">
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                <p className="font-bold">🎧 Listening & Pronunciation</p>
                                <p>
                                    Enhance your understanding of spoken language and refine your
                                    accent.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                    </RadioCards.Root>
                </Box>
            </div>
            <div className="flex justify-center items-center gap-5">
                <button
                    className="group text-sm font-medium flex items-center cursor-pointer"
                    onClick={() => props.getSelectedGoal(undefined, true)}
                >
                    <IoChevronBackOutline
                        className="transition-all group-hover:pe-1 group-hover:scale-125
                     group-hover:text-blue-500 text-lg"
                    />
                    <span className="transition-colors group-hover:text-blue-500 text-lg">
                        Back
                    </span>
                </button>
                <button
                    type="button"
                    disabled={!selectedGoal}
                    onClick={() => {
                        if (selectedGoal) {
                            props.getSelectedGoal(selectedGoal, false);
                        }
                    }}
                    className={`font-medium rounded-lg text-sm px-6.5 py-2.5 text-white 
                    ${
                        selectedGoal
                            ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            : "bg-blue-400 cursor-not-allowed"
                    }`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
