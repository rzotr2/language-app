import { useState } from 'react'
import { Box, Flex, RadioCards } from "@radix-ui/themes";
import { IoChevronBackOutline } from "react-icons/io5";

type LanguageChooseProps = {
    getSelectedLevel: (selectedLevel?: string, back?: boolean) => void;
    show: boolean;
}

export default function LevelChoose(props: LanguageChooseProps) {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    return (
        <div className={`${props.show ? "sm:h-[500px] flex flex-col justify-between" : "w-0 h-0 overflow-hidden"}`}>
            <h3 className="text-sm mb-4 md:mb-7 md:text-xl font-semibold">
                Choose your current language level:
            </h3>
            <div className="mb-6 md:w-2/3 mx-auto">
                <Box maxWidth="">
                    <RadioCards.Root columns={{ initial: "1", sm: "2" }}
                                     onValueChange={(value) => setSelectedLevel(value)}
                    >
                        <RadioCards.Item value="A-1">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">A1 – Beginner</p>
                                <p>
                                    Can understand and use very basic phrases and introductions;
                                    can ask and answer simple questions.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="A-2">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">A2 – Elementary</p>
                                <p>
                                    Handles everyday tasks and routine exchanges;
                                    can describe in simple terms family, shopping, local geography.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="B-1">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">B1 – Intermediate</p>
                                <p>
                                    Communicates on familiar topics, produces simple connected text;
                                    can narrate experiences and ambitions.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="B-2">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">B2 – Upper-Intermediate</p>
                                <p>
                                    Understands main ideas of complex text;
                                    interacts with fluency and spontaneity in most situations.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="C-1">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">C1 – Advanced</p>
                                <p>
                                    Uses language flexibly for social, academic and professional purposes;
                                    expresses ideas coherently and precisely.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                        <RadioCards.Item value="C-2">
                            <Flex direction="column" width="100%">
                                <p className="font-bold">C2 – Proficient</p>
                                <p>
                                    Near-native mastery; understands virtually everything
                                    heard or read, and expresses nuances effortlessly.
                                </p>
                            </Flex>
                        </RadioCards.Item>
                    </RadioCards.Root>
                </Box>
            </div>
            <div className="flex justify-center items-center gap-5">
                <button
                    className="group text-sm font-medium flex items-center cursor-pointer"
                    onClick={() => props.getSelectedLevel(undefined, true)}
                >
                    <IoChevronBackOutline className="transition-all group-hover:pe-1 group-hover:scale-125
                     group-hover:text-blue-500 text-lg" />
                    <span className="transition-colors group-hover:text-blue-500 text-lg">Back</span>
                </button>
                <button type="button"
                        disabled={!selectedLevel}
                        onClick={() => {
                            if (selectedLevel) {
                                props.getSelectedLevel(selectedLevel, false);
                            }
                        }}
                        className={`font-medium rounded-lg text-sm px-5 py-2.5 text-white 
                    ${selectedLevel ? 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
                            : "bg-blue-400 cursor-not-allowed"}`}>
                    Continue
                </button>
            </div>
        </div>
    )
}
