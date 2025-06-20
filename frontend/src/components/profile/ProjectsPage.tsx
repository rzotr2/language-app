import { Box, Card, Inset } from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const ProjectsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto max-w-[98%] md:max-w-[80vw] lg:max-w-[60vw] shadow-xl mt-5 sm:my-8">
            <div
                className="mx-auto rounded-t-2xl bg-gradient-to-r from-blue-600
                to-indigo-600 shadow-lg px-5 md:px-7 py-3 md:py-5 text-white flex flex-col items-start"
            >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                    {t("projects.title")}
                </h2>
                <p className="text-md sm:text-lg md:text-xl font-normal opacity-90">
                    {t("projects.subtitle")}
                </p>
            </div>
            <div>
                <div className="flex flex-wrap justify-center gap-5 md:gap-5 h-max w-[95%] mx-auto py-6">
                    <Box
                        className="flex-1"
                        minWidth="300px"
                    >
                        <a
                            href="https://rzotr2.github.io/task-manager/"
                            target="_blank"
                        >
                            <Card
                                size="3"
                                className="shadow-lg md:shadow-none md:hover:shadow-lg hover:-translate-y-[3px] transition-transform duration-150 cursor-pointer"
                            >
                                <Inset
                                    clip="padding-box"
                                    side="top"
                                    pb="current"
                                >
                                    <img
                                        src="https://i.postimg.cc/T14QX5ZQ/taskmanager.png"
                                        alt="Task Manager image from 'postimage'"
                                        className="block object-cover w-full"
                                    />
                                </Inset>
                                <p className="font-bold">{t("projects.taskManager.title")}</p>
                                <p>{t("projects.taskManager.description")}</p>
                            </Card>
                        </a>
                    </Box>
                    <Box
                        className="flex-1"
                        minWidth="300px"
                    >
                        <a
                            href="https://rzotr2-weather-app.xyz/"
                            target="_blank"
                        >
                            <Card
                                size="3"
                                className="shadow-lg md:shadow-none md:hover:shadow-lg hover:-translate-y-[3px] transition-transform duration-300 cursor-pointer"
                            >
                                <Inset
                                    clip="padding-box"
                                    side="top"
                                    pb="current"
                                >
                                    <img
                                        src="https://i.postimg.cc/908ys4Db/Screenshot-2025-06-20-at-14-41-37.png"
                                        alt="Weather app image from 'postimage'"
                                        className="block object-cover w-full"
                                    />
                                </Inset>
                                <p className="font-bold">{t("projects.weatherApp.title")}</p>
                                <p>{t("projects.weatherApp.description")}</p>
                            </Card>
                        </a>
                    </Box>
                    <Box
                        className="flex-1"
                        minWidth="300px"
                    >
                        <Link
                            to="/"
                            from="/"
                        >
                            <Card
                                size="3"
                                className="shadow-lg md:shadow-none md:hover:shadow-lg hover:-translate-y-[3px] transition-transform duration-150 cursor-pointer"
                            >
                                <Inset
                                    clip="padding-box"
                                    side="top"
                                    pb="current"
                                >
                                    <img
                                        src="https://i.postimg.cc/fbH8NYw9/Screenshot-2025-06-20-at-14-46-09.png"
                                        alt="Language app image from 'postimage'"
                                        className="block object-cover w-full"
                                    />
                                </Inset>
                                <p className="font-bold">{t("projects.languageApp.title")}</p>
                                <p>{t("projects.languageApp.description")}</p>
                            </Card>
                        </Link>
                    </Box>
                </div>
            </div>
        </div>
    );
};
