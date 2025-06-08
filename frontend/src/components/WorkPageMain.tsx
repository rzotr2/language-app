import Select from "react-select";
import { useState } from "react";
import { Box, Flex, RadioCards } from "@radix-ui/themes";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const languageOptions = [
    { value: "en", label: "English 🇬🇧" },
    { value: "de", label: "Deutsch 🇩🇪" },
    { value: "uk", label: "Ukrainian 🇺🇦" },
    { value: "fr", label: "French 🇫🇷" },
    { value: "es", label: "Spanish 🇪🇸" },
    { value: "pl", label: "Polish 🇵🇱" },
    { value: "other", label: "Other" },
];

function WorkPageMain() {
    const [selectedNativeLanguage, setSelectedNativeLanguage] = useState<string | null>(null);
    const [closed, setClosed] = useState<boolean>(false);

    return (
        <>
            <div className="flex-1 h-full mt-5">
                <section
                    className="md:py-5 py-2 px-5 font-bold container mx-auto md:max-w-[80vw] lg:max-w-[50vw] shadow-md"
                >
                    <div className="space-y-3 sm:space-y-5 mb-5">
                        <label htmlFor="message"
                               className="block mb-2 text-sm font-medium text-gray-900">
                            What do you want to generate?
                        </label>
                        <textarea id="message" rows={3}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                  border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="For example: generate exercises on topic 'How i spent my summer'. It should be for A-2 speaking level">
                        </textarea>
                        <div className="flex items-center justify-around flex-wrap gap-5">
                            <div className="flex-col justify-center items-center">
                                <label htmlFor="message"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    I speak:
                                </label>
                                <Select isSearchable={false} className="w-[160px] text-center"
                                        defaultValue={languageOptions[0]}
                                        onChange={(option) => {
                                            setSelectedNativeLanguage(option!.label);
                                        }} options={languageOptions}/>
                            </div>
                            <div className="flex-col justify-center items-center">
                                <label htmlFor="message"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    I want to learn:
                                </label>
                                <Select isSearchable={false} className="w-[160px] text-center"
                                        defaultValue={languageOptions[0]}
                                        onChange={(option) => {
                                            setSelectedNativeLanguage(option!.label);
                                        }} options={languageOptions}/>
                            </div>
                            <div className="w-[200px]">
                                <label htmlFor="visitors"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Select number of exercises:
                                </label>
                                <input type="number" id="visitors" max={10} min={1}
                                       className="bg-gray-50 border py-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <div className="w-full flex flex-col items-center sm:block space-y-6">
                                <div className="flex flex-wrap gap-3 justify-between items-center">
                                    <div className="sm:max-w-1/2 mx-auto sm:mx-0">
                                        <label htmlFor="visitors"
                                               className="block font-medium text-sm mb-2 text-gray-900">
                                            Select difficulty:
                                        </label>
                                        <div className="radio-input">
                                            <label className="label">
                                                <input
                                                    type="radio"
                                                    id="value-1"
                                                    name="value-radio"
                                                    value="value-1"
                                                />
                                                <p className="text">Easy</p>
                                            </label>
                                            <label className="label">
                                                <input type="radio" id="value-2" name="value-radio" value="value-2"/>
                                                <p className="text">Medium</p>
                                            </label>
                                            <label className="label">
                                                <input type="radio" id="value-3" name="value-radio" value="value-3"/>
                                                <p className="text">Hard</p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="sm:max-w-[58%] flex-1 h-[198px] min-w-[214px]">
                                        <div className="flex flex-col justify-center py-2 px-4 bg-white border border-gray-200 rounded-lg
                                                shadow-sm cursor-default h-full">
                                            <h5 className="pb-2 text-md font-bold tracking-tight text-gray-900">Hint:</h5>
                                            <ul className="leading-0 space-y-1">
                                                <li>
                                                    <p className="text-sm font-bold inline">{`Easy:\n`}</p>
                                                    <p className="text-sm font-normal inline">Simple sentences and basic vocabulary.</p>
                                                </li>
                                                <li>
                                                    <p className="text-sm font-bold inline">{`Medium:\n`}</p>
                                                    <p className="text-sm font-normal inline">More complex structures and new words.</p>
                                                </li>
                                                <li>
                                                    <p className="text-sm font-bold inline">{`Hard:\n`}</p>
                                                    <p className="text-sm font-normal inline">Advanced topics, complex grammar, and expressions.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <Box className="w-[300px] sm:w-auto">
                                    <label htmlFor="visitors"
                                           className="block mb-2 text-sm font-medium text-gray-900">
                                        Select type of exercises:
                                    </label>
                                    <RadioCards.Root defaultValue="1" columns={{initial: "1", sm: "3"}}>
                                        <RadioCards.Item value="1">
                                            <Flex direction="column" width="100%">
                                                <p className="font-bold">Translate Sentences</p>
                                                <p>Practice translating sentences between your native and target language.</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="2">
                                            <Flex direction="column" width="100%">
                                                <p className="font-bold">Fill in the Blanks</p>
                                                <p>Complete sentences by filling in missing words to reinforce grammar and vocabulary.</p>
                                            </Flex>
                                        </RadioCards.Item>
                                        <RadioCards.Item value="3">
                                            <Flex direction="column" width="100%">
                                                <p className="font-bold">Multiple Choice</p>
                                                <p>Choose the correct answer from several options to test your understanding.</p>
                                            </Flex>
                                        </RadioCards.Item>
                                    </RadioCards.Root>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="text-center sm:text-end mb-5 sm:mb-0">
                        <button className="button">
                            Generate
                        </button>
                    </div>
                </section>
                <section className="transition-all duration-500 md:py-5 py-2 px-5 font-bold
                            container mx-auto md:max-w-[60vw] shadow-md my-3">
                    <div className="text-center text-lg mb-2">
                        <h5>Text translation</h5>
                    </div>
                    <div className="space-y-3">
                        <p className="font-normal text-sm sm:text-md">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker
                            including versions of Lorem Ipsum.
                        </p>
                        {!closed && (
                            <div className="flex items-center w-full bg-blue-50 py-2.5 px-4 rounded-lg">
                                <div className="mr-2 text-xl text-blue-700 flex-shrink-0">
                                    <IoMdInformationCircleOutline />
                                </div>
                                <p className="flex-1 font-semibold text-blue-700 text-sm">
                                    It is better to use device with a big screen for this exercise.
                                </p>
                                <button onClick={() => setClosed(true)}
                                        className="ml-2 text-xl text-blue-700 cursor-pointer focus:outline-none"
                                        aria-label="Close"
                                        type="button"
                                >
                                    <IoMdClose />
                                </button>
                            </div>
                        )}
                        <label htmlFor="message"
                               className="block mb-2 text-sm font-medium text-gray-900">
                            Enter your translation:
                        </label>
                        <textarea id="message" rows={6}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                  border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="You shouldn`t translate all exactly. But do your best!">
                        </textarea>
                    </div>
                </section>
            </div>
        </>
    )
}

export default WorkPageMain
