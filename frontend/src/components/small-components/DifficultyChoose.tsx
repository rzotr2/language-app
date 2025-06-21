import { useTranslation } from "react-i18next";

export function DifficultyChoose({
    value,
    onChange,
    name = "difficulty",
}: {
    value: string;
    onChange: (val: string) => void;
    name?: string;
}) {
    const { t } = useTranslation();

    const difficulties = [
        { value: "easy", label: t("difficulty.0") },
        { value: "medium", label: t("difficulty.1") },
        { value: "hard", label: t("difficulty.2") },
    ];

    return (
        <div className="flex flex-col gap-3">
            {difficulties.map((diff) => (
                <label
                    key={diff.value}
                    className={`
                        flex items-center gap-4 px-5 h-12 rounded-xl cursor-pointer border
                        transition ${
                            value === diff.value
                                ? "bg-blue-50 border-blue-400"
                                : "bg-gray-50 border-transparent hover:bg-blue-100"
                        }`}
                >
                    <input
                        type="radio"
                        name={name}
                        value={diff.value}
                        checked={value === diff.value}
                        onChange={() => onChange(diff.value)}
                        className="appearance-none w-3.5 h-3.5 rounded-full border-2 border-blue-400
                          checked:bg-blue-500 checked:border-blue-500
                          flex items-center justify-center transition
                          focus:ring-2 focus:ring-blue-300 mr-2 relative"
                    />
                    <span
                        className={`text-base font-medium ${value === diff.value ? "text-blue-700" : "text-gray-700"}`}
                    >
                        {diff.label}
                    </span>
                </label>
            ))}
        </div>
    );
}
