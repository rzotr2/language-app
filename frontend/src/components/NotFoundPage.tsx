import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-white h-[calc(100vh-56px-64px-32px)] flex items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                        {t("notFound.title")}
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 ">
                        {t("notFound.description")}
                    </p>
                    <Link
                        to="/"
                        from="/"
                        className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        {t("notFound.backToHome")}
                    </Link>
                </div>
            </div>
        </section>
    );
};
