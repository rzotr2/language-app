import { Select } from "@radix-ui/themes";
import { IoLanguageOutline } from "react-icons/io5";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../../../store/language.ts";

const languageOptions = [
    { value: "en", label: "English 🇬🇧", emoji: " 🇬🇧" },
    { value: "de", label: "Deutsch 🇩🇪", emoji: " 🇩🇪" },
    { value: "uk", label: "Ukrainian 🇺🇦", emoji: " 🇺🇦" },
    { value: "fr", label: "French 🇫🇷", emoji: " 🇫🇷" },
    { value: "es", label: "Spanish 🇪🇸", emoji: " 🇪🇸" },
    { value: "pl", label: "Polish 🇵🇱", emoji: " 🇵🇱" },
];

export const LanguageSelect = () => {
    const [value, setValue] = useState<string | null>(null);
    const selected = languageOptions.find((lang) => lang.value === value);

    const { i18n } = useTranslation();

    const setLanguage = useLanguageStore((state) => state.setLanguage);

    return (
        <Select.Root
            value={value ?? null}
            onValueChange={(value) => {
                setValue(value);
                i18n.changeLanguage(value);
                setLanguage(value);
            }}
        >
            <Select.Trigger>
                {selected ? (
                    <span className="flex items-center gap-2">
                        <span>{selected.emoji}</span>
                    </span>
                ) : (
                    <IoLanguageOutline />
                )}
            </Select.Trigger>
            <Select.Content>
                {languageOptions.map((lang, index) => {
                    return (
                        <Select.Item
                            key={index}
                            value={lang.value}
                        >
                            {lang.label}
                        </Select.Item>
                    );
                })}
            </Select.Content>
        </Select.Root>
    );
};
