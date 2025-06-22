import { FaCloudDownloadAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const ResumePage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-900 text-white md:w-1/3 w-full flex flex-col items-center py-8 px-6">
                    <img
                        src="https://i.postimg.cc/kg7mBs76/cropped-circle-image.png"
                        alt="Profile photo"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-1 text-center">
                        {t("resume.profile.name")}
                    </h2>
                    <div className="text-lg font-semibold mb-1 text-center">
                        {t("resume.profile.position")}
                    </div>
                    <div className="text-sm text-gray-300 mb-4">{t("resume.profile.intern")}</div>
                    <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-base">Email:</span>
                            <span className="text-sm">pavel.lukin126@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-base">Phone:</span>
                            <span className="text-sm">+49 160 926 814 58</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-base">GitHub:</span>
                            <a
                                href="https://github.com/rzotr2"
                                target="_blank"
                                className="text-sm underline"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-base">
                                {t("resume.profile.age")}
                            </span>
                            <span className="text-sm">{t("resume.profile.ageNumber")}</span>
                        </div>
                    </div>
                    <div className="w-full border-b border-gray-700 my-4" />
                    <div className="w-full">
                        <h3 className="text-lg font-bold mb-2">{t("resume.education.title")}</h3>
                        <div className="mb-3">
                            <div className="font-semibold">
                                {t("resume.education.bachelor.degree")}
                            </div>
                            <div className="text-sm">
                                {t("resume.education.bachelor.institution")}
                            </div>
                            <div className="text-sm">{t("resume.education.bachelor.location")}</div>
                            <div className="text-xs text-gray-400">2018-2022</div>
                        </div>
                        <div className="mb-3">
                            <div className="font-semibold">
                                {t("resume.education.master.degree")}
                            </div>
                            <div className="text-sm">
                                {t("resume.education.master.institution")}
                            </div>
                            <div className="text-sm">{t("resume.education.master.location")}</div>
                            <div className="text-xs text-gray-400">2022-2024</div>
                        </div>
                    </div>
                    <div className="w-full border-b border-gray-700 my-4" />
                    <div className="w-full">
                        <h3 className="text-lg font-bold mb-2">{t("resume.skills.title")}</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            <li>HTML5</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>Tailwind</li>
                            <li>GitHub</li>
                            <li>React</li>
                            <li>Rest API</li>
                            <li>{t("resume.skills.list.0")}</li>
                            <li>Mongo DB</li>
                            <li>TypeScript</li>
                            <li>{t("resume.skills.list.1")}</li>
                        </ul>
                    </div>
                </div>
                <div className="md:w-2/3 w-full bg-white p-8 flex flex-col">
                    <section className="mb-6">
                        <h2 className="text-xl font-bold mb-2">
                            {t("resume.careerObjective.title")}
                        </h2>
                        <p className="text-gray-800">{t("resume.careerObjective.text")}</p>
                    </section>
                    <section className="mb-4">
                        <h2 className="text-xl font-bold mb-2">{t("resume.projects.title")}</h2>
                        <div>
                            <div className="mb-4">
                                <div className="font-bold">
                                    {t("resume.projects.taskManager.title")}
                                </div>
                                <div className="text-sm italic mb-1">
                                    {t("resume.projects.taskManager.subtitle")}
                                </div>
                                <ul className="list-disc list-inside text-sm mb-1">
                                    <li>{t("resume.projects.taskManager.points.0")}</li>
                                    <li>{t("resume.projects.taskManager.points.1")}</li>
                                    <li>
                                        {t("resume.projects.taskManager.points.2")}{" "}
                                        <a
                                            href="https://github.com/rzotr2/task-manager"
                                            target="_blank"
                                            className="underline"
                                        >
                                            GitHub
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-4">
                                <div className="font-bold">
                                    {t("resume.projects.weatherApp.title")}
                                </div>
                                <div className="text-sm italic mb-1"></div>
                                <ul className="list-disc list-inside text-sm mb-1">
                                    <li>{t("resume.projects.weatherApp.points.0")}</li>
                                    <li>{t("resume.projects.weatherApp.points.1")}</li>
                                    <li>{t("resume.projects.weatherApp.points.2")}</li>
                                    <li>
                                        {t("resume.projects.weatherApp.points.3")}{" "}
                                        <a
                                            href="https://github.com/rzotr2/weather-app"
                                            target="_blank"
                                            className="underline"
                                        >
                                            GitHub
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-4">
                                <div className="font-bold">
                                    {t("resume.projects.languageApp.title")}
                                </div>
                                <div className="text-sm italic mb-1">
                                    {t("resume.projects.languageApp.subtitle")}
                                </div>
                                <ul className="list-disc list-inside text-sm mb-1">
                                    <li>{t("resume.projects.languageApp.points.0")}</li>
                                    <li>{t("resume.projects.languageApp.points.1")}</li>
                                    <li>{t("resume.projects.languageApp.points.2")}</li>
                                    <li>{t("resume.projects.languageApp.points.3")}</li>
                                    <li>
                                        {t("resume.projects.languageApp.points.4")}{" "}
                                        <a
                                            href="https://github.com/rzotr2/language-app"
                                            target="_blank"
                                            className="underline"
                                        >
                                            GitHub
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="mb-4">
                        <h2 className="text-xl font-bold mb-2">{t("resume.languages.title")}</h2>
                        <ul className="list-disc list-inside text-sm">
                            <li>{t("resume.languages.list.0")}</li>
                            <li>{t("resume.languages.list.1")}</li>
                            <li>{t("resume.languages.list.2")}</li>
                            <li>{t("resume.languages.list.3")}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold mb-2">{t("resume.strengths.title")}</h2>
                        <ul className="list-disc list-inside text-sm">
                            <li>{t("resume.strengths.list.0")}</li>
                            <li>{t("resume.strengths.list.1")}</li>
                            <li>{t("resume.strengths.list.2")}</li>
                            <li>{t("resume.strengths.list.3")}</li>
                        </ul>
                    </section>
                    <div className="p-5 mt-5 bg-gray-100 rounded-xl">
                        <ul className="space-y-3 mb-5">
                            <li className="flex items-center gap-5 justify-between">
                                <p className="font-semibold">
                                    {t("resume.downloadResumeDE") + " " + "(.pdf)"}
                                </p>
                                <a
                                    href={`api/uploads/DE`}
                                    download
                                    className="border-2 border-indigo-600 text-indigo-600 px-3 py-1 md:px-6 md:py-2
                                    rounded-lg font-semibold hover:bg-indigo-50 transition"
                                >
                                    <FaCloudDownloadAlt />
                                </a>
                            </li>
                            <li className="flex items-center gap-5 justify-between">
                                <p className="font-semibold">
                                    {t("resume.downloadResumeEN") + " " + "(.pdf)"}
                                </p>
                                <a
                                    href={`api/uploads/EN`}
                                    download
                                    className="border-2 border-indigo-600 text-indigo-600 px-3 py-1 md:px-6 md:py-2
                                    rounded-lg font-semibold hover:bg-indigo-50 transition"
                                >
                                    <FaCloudDownloadAlt />
                                </a>
                            </li>
                        </ul>
                        <div className="flex gap-2 justify-center">
                            <a
                                href="mailto:pavel.lukin126@gmail.com"
                                className="bg-indigo-600 text-white px-3 py-1 md:px-6 md:py-2 rounded-lg
                                    font-semibold shadow hover:bg-indigo-700 transition"
                            >
                                {t("resume.contactButton")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
