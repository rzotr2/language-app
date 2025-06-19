import { useEffect, useState } from "react";
import type { FlipCardType } from "../../../types";
import { useTranslation } from "react-i18next";

type FlipCardProps = FlipCardType & { reset: boolean };

export default function FlipCard({
    word,
    translation,
    meaning,
    example,
    transcription,
    reset,
}: FlipCardProps) {
    const [flipped, setFlipped] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setFlipped(reset);
    }, [reset]);

    return (
        <div
            className={`card card-hover-up min-w-[200px] relative min-h-[250px]
                cursor-pointer transition-transform flex-1 ${flipped ? "flipped" : ""}`}
            onClick={(e) => {
                if ((e.target as HTMLElement).closest(".delete-card")) return;
                setFlipped((f) => !f);
            }}
        >
            <div className="card-inner w-full">
                <div className="card-front rounded-lg shadow-md bg-white p-3 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold text-indigo-700">{word}</h3>
                    {transcription && <p className="text-gray-500">{transcription}</p>}
                </div>
                <div className="card-back rounded-lg shadow-md bg-indigo-50 py-2 px-4 md:py-6 flex flex-col items-center space-y-1.5">
                    <h3 className="text-lg font-bold text-indigo-700">{translation}</h3>
                    <p className="text-sm">{meaning}</p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">{t("flipCards.flipCardExample")}</span>{" "}
                        {example}
                    </p>
                </div>
            </div>
        </div>
    );
}
