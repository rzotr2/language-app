import WorkPageMain from "../components/WorkPageMain.tsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import { checkUserAuth } from "../auth/auth.ts";

export const Route = createFileRoute("/workPage")({
    loader: () => checkUserAuth(location.pathname),
    component: WorkPage,
});

function WorkPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation();

    const getIsLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    };

    return (
        <>
            {loading && (
                <div
                    className="w-screen h-screen flex flex-col justify-center items-center
                fixed bg-gray-400 opacity-90 z-100"
                >
                    <div className="Buttons mb-5"></div>
                    <div className="text-center font-extrabold text-xl">
                        <p>{t("user.loading")}</p>
                    </div>
                </div>
            )}
            <WorkPageMain getIsLoading={getIsLoading} />
        </>
    );
}
