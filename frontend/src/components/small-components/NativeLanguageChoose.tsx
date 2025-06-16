import { useState } from "react";
import ukraine from "../../assets/svg/flags/ukraine.svg";
import deutschland from "../../assets/svg/flags/deutschland.svg";
import spain from "../../assets/svg/flags/spain.svg";
import france from "../../assets/svg/flags/france.svg";
import us from "../../assets/svg/flags/us.svg";
import poland from "../../assets/svg/flags/polland.svg";
import { IoChevronBackOutline } from "react-icons/io5";

type LanguageChooseProps = {
    getSelectedNativeLanguage: (selectedLanguage?: string, back?: boolean) => void;
    show: boolean;
};

type Lang = {
    id: string;
    label: string;
    img: string;
};

const languages: Lang[] = [
    { id: "uk", label: "Ukrainian", img: ukraine },
    { id: "de", label: "Deutsch", img: deutschland },
    { id: "es", label: "Spanish", img: spain },
    { id: "en", label: "English", img: us },
    { id: "fr", label: "French", img: france },
    { id: "pl", label: "Polish", img: poland },
];

export default function NativeLanguageChoose(props: LanguageChooseProps) {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

    return (
        <div
            className={`${props.show ? "sm:h-[500px] flex flex-col justify-between" : "w-0 h-0 overflow-hidden"}`}
        >
            <h3 className="text-sm mb-4 md:mb-7 md:text-xl font-semibold">
                What language do you speak?
            </h3>

            <div className="container mx-auto flex items-center md:flex-row justify-center flex-wrap pb-5">
                {languages.map((lang) => {
                    const isActive = selectedLanguage === lang.id;

                    return (
                        <div
                            key={lang.id}
                            onClick={() => setSelectedLanguage(lang.id)}
                            className={`w-[31%] m-0.5 md:m-1 md:w-[25%] flex flex-col items-center justify-center py-4 
                            cursor-pointer transition-all ${
                                isActive
                                    ? "bg-blue-50 ring-2 ring-blue-400 shadow-lg"
                                    : "bg-white shadow-md hover:bg-gray-100"
                            }`}
                        >
                            <img
                                src={lang.img}
                                alt={lang.label}
                                className="h-10 md:h-24 mb-2 rounded-md shadow-lg shadow-gray-400"
                            />
                            <p
                                className={`font-medium ${isActive ? "text-blue-600" : "text-gray-800"}`}
                            >
                                {lang.label}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center items-center gap-5">
                <button
                    className="group text-sm font-medium flex items-center cursor-pointer"
                    onClick={() => props.getSelectedNativeLanguage(undefined, true)}
                >
                    <IoChevronBackOutline
                        className="transition-all group-hover:pe-1 group-hover:scale-125
                     group-hover:text-blue-500 text-lg"
                    />
                    <span className="transition-colors group-hover:text-blue-500 text-lg">
                        Back
                    </span>
                </button>
                <button
                    type="button"
                    disabled={!selectedLanguage}
                    onClick={() => {
                        if (selectedLanguage) {
                            props.getSelectedNativeLanguage(selectedLanguage, false);
                        }
                    }}
                    className={`font-medium rounded-lg text-sm px-5 py-2.5 text-white 
                    ${
                        selectedLanguage
                            ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            : "bg-blue-400 cursor-not-allowed"
                    }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
