import { CustomTooltip } from "../small-components/CustomTooltip.tsx";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto max-w-[98%] md:max-w-[75vw] lg:max-w-[60vw] shadow-xl mt-5 sm:my-8">
            <div
                className="mx-auto rounded-t-2xl bg-gradient-to-r from-blue-600
                to-indigo-600 shadow-lg px-5 md:px-7 py-3 md:py-5 text-white flex flex-col items-start"
            >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                    {t("about.banner.name")}
                </h2>
                <p className="text-md sm:text-lg md:text-xl font-normal opacity-90">
                    {t("about.banner.position")}
                </p>
            </div>
            <div>
                <div className="flex flex-wrap justify-center sm:flex-nowrap gap-2 md:gap-5 h-max w-[95%] mx-auto py-8">
                    <div className="w-full sm:w-1/3 flex justify-center items-start">
                        <img
                            className="rounded-full shadow-lg w-48 h-48 object-cover bg-blue-100"
                            src="https://i.postimg.cc/kg7mBs76/cropped-circle-image.png"
                            alt="My photo"
                        />
                    </div>
                    <div className="w-full sm:max-w-2/3 flex flex-col justify-center px-2">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 text-gray-900">
                                {t("about.greetingTitle")}
                            </h3>
                            <CustomTooltip
                                type="information"
                                text={t("about.tooltip")}
                            />
                        </div>
                        <div className="text-gray-700 text-base sm:text-lg mb-4">
                            <p>{t("about.aboutText.0")}</p>
                            <br />
                            <p>{t("about.aboutText.1")}</p>
                            <br />
                            <p>{t("about.aboutText.2")}</p>
                            <br />
                            <p>{t("about.aboutText.3")}</p>
                        </div>
                        <div className="flex gap-2 my-4">
                            <a
                                href="mailto:pavel.lukin126@gmail.com"
                                className="bg-indigo-600 text-white px-3 py-1 md:px-6 md:py-2 rounded-lg
                                    font-semibold shadow hover:bg-indigo-700 transition"
                            >
                                {t("about.contactButton")}
                            </a>
                        </div>
                        <ul className="space-y-5">
                            <li className="flex items-center gap-5 justify-between">
                                <p className="font-semibold">
                                    {t("about.downloadResumeDE") + " " + "(.pdf)"}
                                </p>
                                <a
                                    href="../../../public/Lebenslauf%20Pavlo%20Lukin.pdf"
                                    download
                                    className="border-2 border-indigo-600 text-indigo-600 px-3 py-1 md:px-6 md:py-2
                                    rounded-lg font-semibold hover:bg-indigo-50 transition"
                                >
                                    <FaCloudDownloadAlt />
                                </a>
                            </li>
                            <li className="flex items-center gap-5 justify-between">
                                <p className="font-semibold">
                                    {t("about.downloadResumeEN") + " " + "(.pdf)"}
                                </p>
                                <a
                                    href="../../../public/Lebenslauf%20Pavlo%20Lukin%20EN.pdf"
                                    download
                                    className="border-2 border-indigo-600 text-indigo-600 px-3 py-1 md:px-6 md:py-2
                                    rounded-lg font-semibold hover:bg-indigo-50 transition"
                                >
                                    <FaCloudDownloadAlt />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
