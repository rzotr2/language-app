import { Select } from "@radix-ui/themes";
import { IoLanguageOutline } from "react-icons/io5";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../../store/language.ts";
import { useAuthState } from "../../store/auth.ts";

const languageOptions = [
    { value: "en", label: "English 🇬🇧", emoji: " 🇬🇧" },
    { value: "de", label: "Deutsch 🇩🇪", emoji: " 🇩🇪" },
    { value: "uk", label: "Ukrainian 🇺🇦", emoji: " 🇺🇦" },
    { value: "fr", label: "French 🇫🇷", emoji: " 🇫🇷" },
    { value: "es", label: "Spanish 🇪🇸", emoji: " 🇪🇸" },
    { value: "pl", label: "Polish 🇵🇱", emoji: " 🇵🇱" },
    { value: "cz", label: "Czech 🇨🇿", emoji: " 🇨🇿" },
];

export const LanguageSelect = () => {
    const { currentUser } = useAuthState();
    const [value, setValue] = useState<string | null>(
        localStorage.getItem("currentLanguage") || currentUser?.nativeLanguage || null,
    );

    const { i18n } = useTranslation();

    const setLanguage = useLanguageStore((state) => state.setLanguage);

    return (
        <Select.Root
            value={value as string | undefined}
            onValueChange={(value) => {
                setValue(value);
                i18n.changeLanguage(value);
                localStorage.setItem("currentLanguage", value);
                setLanguage(value);
            }}
        >
            <Select.Trigger>
                {value ? (
                    <span>{languageOptions.find((l) => l.value === value)?.emoji}</span>
                ) : (
                    <IoLanguageOutline />
                )}
            </Select.Trigger>
            <Select.Content position="popper">
                {languageOptions.map((lang, index) => (
                    <Select.Item
                        key={index}
                        value={lang.value}
                    >
                        {lang.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};
