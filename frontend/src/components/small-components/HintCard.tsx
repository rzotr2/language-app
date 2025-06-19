import { useTranslation } from "react-i18next";

export const HintCard = () => {
    const { t } = useTranslation();

    return (
        <div className="sm:max-w-[58%] flex-1 h-[170px] min-w-[214px]">
            <div
                className="flex flex-col justify-center py-2 px-4 bg-white border border-gray-200 rounded-lg
                                                shadow-sm cursor-default h-full"
            >
                <h5 className="pb-2 text-md font-bold tracking-tight text-gray-900">
                    {t("hintCard.title")}
                </h5>
                <ul className="leading-0 space-y-1">
                    <li>
                        <p className="text-sm font-bold inline">{`Easy:\n`}</p>
                        <p className="text-sm font-normal inline">{t("hintCard.easyDesc")}</p>
                    </li>
                    <li>
                        <p className="text-sm font-bold inline">{`Medium:\n`}</p>
                        <p className="text-sm font-normal inline">{t("hintCard.mediumDesc")}</p>
                    </li>
                    <li>
                        <p className="text-sm font-bold inline">{`Hard:\n`}</p>
                        <p className="text-sm font-normal inline">{t("hintCard.hardDesc")}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};
