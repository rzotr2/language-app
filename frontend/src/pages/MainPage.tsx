import HeaderGeneral from "../components/HeaderGeneral.tsx";
import FooterGeneral from "../components/FooterGeneral.tsx";
import MainPageMain from "../components/MainPageMain.tsx";
import { useState } from "react";

function MainPage() {
    const [loading, setLoading] = useState<boolean>(false);

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
                        <p>Submitting your answers,</p>
                        <p>please wait...</p>
                    </div>
                </div>
            )}
            <div className="flex flex-col justify-between min-h-[100vh]">
                <HeaderGeneral />
                <MainPageMain getIsLoading={getIsLoading} />
                <FooterGeneral />
            </div>
        </>
    );
}

export default MainPage;
