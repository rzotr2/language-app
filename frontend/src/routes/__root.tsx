import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { checkUserAuth } from "../auth/auth.ts";
import HeaderGeneral from "../components/HeaderGeneral.tsx";
import FooterGeneral from "../components/FooterGeneral.tsx";
import { useAuthState } from "../../store/auth.ts";
import { useLocation } from "@tanstack/react-router";
import { notFoundPage } from "./notFoundPage.tsx";

export const Route = createRootRoute({
    loader: async () => {
        await checkUserAuth();
    },
    component: Root,
    notFoundComponent: notFoundPage,
});

export function Root() {
    const { i18n } = useTranslation();
    const { currentUser } = useAuthState();
    const location = useLocation();
    const hideHeaderFooter =
        location.pathname === "/loginPage" || location.pathname === "/signUpPage";

    useEffect(() => {
        const currentLanguage = localStorage?.getItem("currentLanguage");
        if (currentLanguage) {
            i18n.changeLanguage(currentLanguage);
        } else if (currentUser) {
            i18n.changeLanguage(currentUser.nativeLanguage);
        }
    }, [currentUser, i18n]);

    return (
        <div className="flex flex-col justify-between min-h-[100vh]">
            {!hideHeaderFooter && <HeaderGeneral />}
            <Outlet />
            {!hideHeaderFooter && <FooterGeneral />}
        </div>
    );
}
