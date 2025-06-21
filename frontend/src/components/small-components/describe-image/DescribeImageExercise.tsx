import { useRef, useState } from "react";
import type { CheckDescriptionProps, PhotoType } from "../../../types";
import { PiShootingStarBold } from "react-icons/pi";
import { Collapsible, Separator } from "radix-ui";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { checkImageDescription } from "../../../services/ai.ts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useTranslation } from "react-i18next";

type DescribeImageExerciseProps = {
    image: PhotoType;
    difficulty: string;
    getIsLoading: (isLoading: boolean) => void;
    generateMore: () => void;
    languageToLearn: string;
    nativeLanguage: string;
};

export const DescribeImageExercise = ({
    getIsLoading,
    generateMore,
    difficulty,
    image,
    languageToLearn,
    nativeLanguage,
}: DescribeImageExerciseProps) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [currentDescription, setCurrentDescription] = useState<string | null>(null);
    const [checkDescriptionResultMyText, setCheckDescriptionResultMyText] = useState<string | null>(
        null,
    );
    const [checkDescriptionResultGrade, setCheckDescriptionResultGrade] = useState<string | null>(
        null,
    );
    const [checkDescriptionResultAiVersion, setCheckDescriptionResultAiVersion] = useState<
        string | null
    >(null);
    const [collapsibleOpened, setCollapsibleOpened] = useState<boolean>(false);
    const { t } = useTranslation();

    const handleCheckDescriptionClick = () => {
        const propertiesObj: CheckDescriptionProps = {
            nativeLanguage: nativeLanguage,
            languageToLearn: languageToLearn,
            description: currentDescription as string,
            img: image.alt ?? "no image",
        };

        if (currentDescription) {
            getIsLoading(true);
            checkImageDescription(propertiesObj).then((data) => {
                const parsed = JSON.parse(data.data.output_text);
                setCheckDescriptionResultMyText(parsed.myText);
                setCheckDescriptionResultGrade(parsed.problem);
                setCheckDescriptionResultAiVersion(parsed.aiTextVersion);
                getIsLoading(false);
                setTimeout(() => {
                    anchorRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
            });
        } else {
            setCheckDescriptionResultMyText("You should enter something");
        }
    };

    return (
        <>
            <div
                className="bg-gradient-to-r from-blue-600 to-indigo-700 py-2 px-3 sm:py-3 sm:px-6 rounded-t-xl"
                ref={anchorRef}
            >
                <h3 className="text-white text-lg sm:text-xl font-bold">{t("imageDesc.title")}</h3>
                <p className="text-blue-100 mt-1 text-sm sm:text-lg">{t("imageDesc.subtitle")}</p>
            </div>
            <div className="relative flex items-center mt-4 mb-5 mx-4 sm:mx-6 md:mx-8">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                <div>
                    <span className="text-blue-900 font-extrabold text-md sm:text-lg flex items-center gap-2">
                        {t("imageDesc.mainInstruction")}
                    </span>
                    <div className="mt-1 text-blue-500 text-xs italic tracking-wide">
                        {t("imageDesc.hint")}
                    </div>
                </div>
            </div>
            <div className="space-y-5 px-3 sm:px-5 mt-3">
                <img
                    src={image.src}
                    alt={image.alt || "no image"}
                />
                <label
                    htmlFor="message"
                    className="font-bold text-gray-900"
                >
                    {t("imageDesc.enterWhatYouSee")}
                </label>
                <textarea
                    id="message"
                    rows={6}
                    value={currentDescription === null ? "" : currentDescription}
                    onInput={(e) => setCurrentDescription(e.currentTarget.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                  border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-normal mt-1.5"
                    placeholder={`${t("imageDesc.textareaPlaceholder")}`}
                ></textarea>
                {checkDescriptionResultGrade && checkDescriptionResultAiVersion && (
                    <div
                        ref={anchorRef}
                        className="my-6 space-y-5 text-sm sm:text-[16px] font-normal"
                    >
                        <div>
                            <p className="font-bold pb-1.5">{t("imageDesc.myVersion")}</p>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {checkDescriptionResultMyText}
                            </Markdown>
                        </div>
                        <Separator.Root className="my-[15px] bg-gray-700 data-[orientation=horizontal]:h-px" />
                        <div>
                            <p className="font-bold pb-1.5">{t("imageDesc.reviewResult")}</p>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {checkDescriptionResultGrade}
                            </Markdown>
                        </div>
                        <Separator.Root className="my-[15px] bg-gray-700 data-[orientation=horizontal]:h-px" />
                        <div>
                            <p className="font-bold pb-1.5">{t("imageDesc.aiVersion")}</p>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {checkDescriptionResultAiVersion}
                            </Markdown>
                        </div>
                    </div>
                )}
                <Collapsible.Root>
                    <Collapsible.Trigger
                        onClick={() => setCollapsibleOpened(!collapsibleOpened)}
                        className="bg-blue-100 text-blue-900 px-3 py-1.5 cursor-pointer rounded-t-sm
                            flex items-center justify-between font-medium hover:bg-blue-200 transition-colors w-full"
                    >
                        {t("imageDesc.collapsible.trigger")}
                        {collapsibleOpened ? (
                            <FaChevronUp className="text-base" />
                        ) : (
                            <FaChevronDown className="text-base" />
                        )}
                    </Collapsible.Trigger>
                    <Collapsible.Content
                        className="CollapsibleContent text-sm bg-blue-50
                         text-blue-900 rounded-b-md p-4 space-y-3"
                    >
                        <div>
                            <span className="font-extrabold">
                                {t("imageDesc.collapsible.generalImpression")}
                            </span>
                            <span className="ml-1 font-medium">
                                {t("imageDesc.collapsible.generalImpressionHint")}
                            </span>
                        </div>
                        <div>
                            <span className="font-extrabold">
                                {t("imageDesc.collapsible.peopleObjects")}
                            </span>
                            <span className="ml-1 font-medium">
                                {t("imageDesc.collapsible.peopleObjectsHint")}
                            </span>
                        </div>
                        <div>
                            <span className="font-extrabold">
                                {t("imageDesc.collapsible.actions")}
                            </span>
                            <span className="ml-1 font-medium">
                                {t("imageDesc.collapsible.actionsHint")}
                            </span>
                        </div>
                        <div>
                            <span className="font-extrabold">
                                {t("imageDesc.collapsible.appearanceDetails")}
                            </span>
                            <span className="ml-1 font-medium">
                                {t("imageDesc.collapsible.appearanceDetailsHint")}
                            </span>
                        </div>
                        <div>
                            <span className="font-extrabold">
                                {t("imageDesc.collapsible.atmosphere")}
                            </span>
                            <span className="ml-1 font-medium">
                                {t("imageDesc.collapsible.atmosphereHint")}
                            </span>
                        </div>
                        <div>
                            <span className="font-extrabold">
                                {t("imageDesc.collapsible.personalOpinion")}
                            </span>
                            <span className="ml-1 font-medium">
                                {t("imageDesc.collapsible.personalOpinionHint")}
                            </span>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
                <div className="flex w-full justify-center sm:justify-end py-3">
                    <div className="flex gap-3 p-0">
                        <button
                            type="button"
                            onClick={handleCheckDescriptionClick}
                            className="text-blue-700 border-blue-700 border focus:outline-none
                            hover:bg-blue-50 font-medium rounded-lg text-sm px-2 py-1.5 sm:px-4
                            sm:py-2.5 text-center cursor-pointer"
                        >
                            {t("imageDesc.checkAnswer")}
                        </button>
                        <button
                            type="button"
                            onClick={generateMore}
                            className="text-white bg-blue-700 hover:bg-blue-800
                             font-medium rounded-lg text-sm px-2 py-1.5 sm:px-4 sm:py-2.5
                            focus:outline-none cursor-pointer flex items-center gap-2"
                        >
                            {t("imageDesc.regenerateImage")}
                            <PiShootingStarBold className="text-[14px]" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-sm text-gray-500 font-medium">
                            {t("imageDesc.difficulty")}
                            <span className="font-bold">{" " + `${difficulty}`}</span>
                        </span>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setCurrentDescription(null);
                                setCheckDescriptionResultMyText(null);
                                setCheckDescriptionResultGrade(null);
                                setCheckDescriptionResultAiVersion(null);
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
                            {t("imageDesc.reset")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
