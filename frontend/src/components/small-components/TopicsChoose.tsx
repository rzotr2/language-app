import { useState } from 'react'
import { Box, Flex, RadioCards } from "@radix-ui/themes";
import  {IoChevronBackOutline } from "react-icons/io5";

type TopicsChooseProps = {
    getSelectedTopic: (selectedLevel?: string, back?: boolean) => void;
    show: boolean;
}

export default function TopicsChoose(props: TopicsChooseProps) {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    return (
        <div className={`${props.show ? "sm:h-[500px] flex flex-col justify-between" : "w-0 h-0 overflow-hidden"}`}>
            <h3 className="text-sm mb-4 md:mb-7 md:text-xl font-semibold">
                What are you interested in?
            </h3>
            <div className="mb-6 md:w-2/3 mx-auto">
                <Box maxWidth="">
                    <RadioCards.Root defaultValue="1"
                                     columns={{ initial: "1", sm: "2" }}
                                     onValueChange={(value) => setSelectedTopic(value)}
                    >
                        <RadioCards.Item value="Technology and Innovation">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">💻 Technology & Innovation</p>
                                <p>
                                    Discuss the latest gadgets, software, and tech trends.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Food and Cooking">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">🍳 Food & Cooking</p>
                                <p>
                                    Explore recipes, culinary terms, and restaurant reviews.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Culture and History">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">🏰 Culture & History</p>
                                <p>
                                    Delve into traditions, historic events, and famous landmarks.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Sports and Fitness">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">🏃‍♂️ Sports & Fitness</p>
                                <p>
                                    Talk about workouts, games, and healthy lifestyles.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Environment and Nature">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">🌿 Environment & Nature</p>
                                <p>
                                    Learn vocabulary on wildlife, conservation, and sustainability.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="Art and Literature">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">🎭 Art & Literature</p>
                                <p>
                                    Analyze books, movies, theater, and creative expression.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                    </RadioCards.Root>
                </Box>
            </div>
            <div className="flex justify-center items-center gap-5">
                <button
                    className="group text-sm font-medium flex items-center cursor-pointer"
                    onClick={() => props.getSelectedTopic(undefined, true)}
                >
                    <IoChevronBackOutline className="transition-all group-hover:pe-1 group-hover:scale-125
                     group-hover:text-blue-500 text-lg" />
                    <span className="transition-colors group-hover:text-blue-500 text-lg">Back</span>
                </button>
                <button type="button"
                        disabled={!selectedTopic}
                        onClick={() => {
                            if (selectedTopic) {
                                props.getSelectedTopic(selectedTopic, false);
                            }
                        }}
                        className={`font-medium rounded-lg text-sm px-5 py-2.5 text-white 
                    ${selectedTopic ? 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
                            : "bg-blue-400 cursor-not-allowed"}`}>
                    Continue
                </button>
            </div>
        </div>
    )
}
