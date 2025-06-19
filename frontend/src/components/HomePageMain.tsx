import languages from "../assets/languages.webp";
import { BiTask } from "react-icons/bi";
import { LuBrainCircuit } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthState } from "../../store/users.ts";

function HomePageMain() {
    const [currentUserLanguage, setCurrentUserLanguage] = useState<string | null>(null);
    const { t } = useTranslation();
    const { currentUserData } = useAuthState();

    useEffect(() => {
        (async () => {
            const lang = await currentUserData?.nativeLanguage;
            if (lang) {
                setCurrentUserLanguage(lang);
            } else {
                setCurrentUserLanguage(null);
            }
        })();
    }, [currentUserData?.nativeLanguage]);

    return (
        <>
            <section className="container mx-auto mt-1 md:mt-8 flex flex-col md:flex-row items-center justify-center">
                <div className="text-white mx-4 md:mx-8 md:w-2/3 hidden md:block md:mb-10">
                    <p className="text-lg font-bold md:text-2xl md:font-semibold text-gray-800">
                        {t("homepage.hero.mainText")}
                    </p>
                    <div className="w-full md:flex justify-center md:justify-start hidden ">
                        <div className="w-full md:w-48 border-b-1 border-gray-600 mt-2 mb-3 md:mt-4 md:mb-6"></div>
                    </div>
                    <p className="text-xl text-gray-600 text-center md:text-start">
                        {t("homepage.hero.subText")}
                    </p>
                    <div className="mt-5">
                        <Link
                            to={currentUserLanguage ? "/workpage" : "/main"}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                            dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                            dark:focus:ring-blue-800 cursor-pointer"
                        >
                            {t("homepage.hero.getStarted")}
                        </Link>
                    </div>
                </div>
                <div className="block md:hidden my-4 text-center px-3">
                    <h3 className="text-lg font-semibold py-1">{t("homepage.hero.mobileTitle")}</h3>
                    <span>{t("homepage.hero.mobileText")}</span>
                    <div className="mt-5">
                        <Link
                            to={currentUserLanguage ? "/workpage" : "/main"}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                            dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                            dark:focus:ring-blue-800 cursor-pointer"
                        >
                            {t("homepage.hero.getStarted")}
                        </Link>
                    </div>
                </div>
                <div className="w-full">
                    <img
                        className="w-[100%] p-2 md:p-0 md:max-w-2xl md:mt-0  md:h-auto"
                        src={languages}
                        alt="Image"
                    />
                </div>
            </section>
            <section
                className="mt-2 bg-gradient-to-r from-[#0F4C5C] to-[#1E6F8E]
                    text-white py-4 md:py-10 px-5 text-center"
            >
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold py-2 md:py-2">
                        {t("homepage.aiSection.title")}
                    </h2>
                    <p className="text-lg py-2 md:py-2">{t("homepage.aiSection.description")}</p>
                </div>
            </section>
            <section className="mt-2 py-4 md:py-10 px-5 text-center">
                <div
                    className="container mx-auto flex flex-col items-center md:flex-row justify-center
                        flex-wrap md:flex-nowrap"
                >
                    <div className="w-2/3 md:w-2/6 flex items-center flex-col">
                        <BiTask className="text-7xl mb-1 md:mb-3" />
                        <div className="flex flex-col items-center">
                            <p className="font-semibold">
                                {t("homepage.features.improveSkillsTitle")}
                            </p>
                            <p className="md:w-4/5">{t("homepage.features.improveSkillsText")}</p>
                        </div>
                    </div>
                    <div className="w-2/3 md:w-2/6 flex items-center flex-col">
                        <LuBrainCircuit className="text-7xl mb-1 md:mb-3" />
                        <div className="flex flex-col items-center">
                            <p className="font-semibold">
                                {t("homepage.features.sharpenKnowledgeTitle")}
                            </p>
                            <p className="md:w-4/5">
                                {t("homepage.features.sharpenKnowledgeText")}
                            </p>
                        </div>
                    </div>
                    <div className="w-2/3 md:w-2/6 flex items-center flex-col">
                        <FiMessageSquare className="text-7xl mb-1 md:mb-3" />
                        <div className="flex flex-col items-center">
                            <p className="font-semibold">
                                {t("homepage.features.practiceConversationTitle")}
                            </p>
                            <p className="md:w-4/5">
                                {t("homepage.features.practiceConversationText")}
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl font-bold pt-10 md:pt-15">{t("homepage.readyTitle")}</h2>
                <div className="my-5">
                    <Link
                        to={currentUserLanguage ? "/workpage" : "/main"}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                            dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                            dark:focus:ring-blue-800 cursor-pointer"
                    >
                        {t("homepage.getStarted")}
                    </Link>
                </div>
            </section>
        </>
    );
}

export default HomePageMain;
