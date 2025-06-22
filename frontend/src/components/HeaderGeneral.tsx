import logo from "../assets/svg/logo.svg";
import { Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { DropdownMenu } from "radix-ui";
import { FiMenu } from "react-icons/fi";
import userLogo from "../assets/svg/userLogo.svg";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "./small-components/LanguageSelect.tsx";
import { useAuthState } from "../store/auth.ts";

export default function HeaderGeneral() {
    const navigate = useNavigate();
    const itemClassName =
        "relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none transition-colors " +
        "focus:bg-slate-50 data-[disabled]:pointer-events-none data-[disabled]:bg-white hover:bg-gray-100";

    const currentUser = useAuthState((state) => state.currentUser);
    const setFieldAuth = useAuthState((state) => state.setFieldAuth);
    const { t } = useTranslation();

    const logOut = async () => {
        try {
            await axios.get("api/auth/logout");
            navigate({ to: "/loginPage" });
            setFieldAuth("currentUser", null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <nav className="w-full py-2 px-1 md:py-3 md:px-3 shadow-sm items-center">
                <div className="w-full flex items-center justify-between px-2 md:px-6">
                    <Link
                        to="/"
                        from="/"
                        className="flex items-center gap-3"
                    >
                        <img
                            src={logo}
                            alt="Language App logo"
                        />
                        <h1 className="text-xl md:text-2xl font-semibold cursor-default">
                            Language App
                        </h1>
                    </Link>
                    <ul className="md:flex space-x-8 hidden font-medium md:items-center">
                        <li>
                            <LanguageSelect />
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                search={{ page: "about" }}
                                className="cursor-pointer hover:underline"
                            >
                                {t("nav.aboutMe")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                search={{ page: "projects" }}
                                className="cursor-pointer hover:underline"
                            >
                                {t("nav.projects")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                search={{ page: "resume" }}
                                className="cursor-pointer hover:underline"
                            >
                                {t("nav.resume")}
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center gap-3">
                                {currentUser ? (
                                    <DropdownMenu.Root modal={false}>
                                        <DropdownMenu.Trigger
                                            className="focus:outline-0 flex gap-2 px-2 items-center text-gray-900 rounded-full
                                                                    hover:text-blue-600 md:me-0 ring-4 ring-gray-100 cursor-pointer"
                                        >
                                            <img
                                                src={userLogo}
                                                alt="user logo"
                                                className="h-7"
                                            />
                                            <svg
                                                className="w-2.5 h-2.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m1 1 4 4 4-4"
                                                />
                                            </svg>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Portal>
                                            <DropdownMenu.Content
                                                collisionPadding={10}
                                                hideWhenDetached={true}
                                                className="z-50 min-w-[12rem] overflow-hidden rounded-lg bg-white shadow-md
                                                        border-gray-300 border-[0.1px]"
                                                align="center"
                                                sideOffset={12}
                                            >
                                                <DropdownMenu.Item
                                                    className={itemClassName}
                                                    disabled={true}
                                                >
                                                    <div className="flex items-center px-4 py-2 gap-3">
                                                        <img
                                                            src={userLogo}
                                                            alt="user logo"
                                                            className="h-6"
                                                        />
                                                        <span className="text-sm font-bold w-full h-full">
                                                            {currentUser.email}
                                                        </span>
                                                    </div>
                                                </DropdownMenu.Item>
                                                <DropdownMenuSeparator className="h-[1px] bg-gray-300" />
                                                <DropdownMenu.Item
                                                    className={itemClassName}
                                                    asChild
                                                    onSelect={() => {}}
                                                >
                                                    <Link
                                                        to="/manage"
                                                        from="/"
                                                        className="px-4 py-2 w-full h-full"
                                                    >
                                                        {t("nav.manageAccount")}
                                                    </Link>
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Item
                                                    className={itemClassName}
                                                    asChild
                                                    onSelect={logOut}
                                                >
                                                    <button className="text-red-500 px-4 py-2 w-full h-full text-start cursor-pointer">
                                                        {t("nav.signOut")}
                                                    </button>
                                                </DropdownMenu.Item>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Portal>
                                    </DropdownMenu.Root>
                                ) : (
                                    <Link
                                        to="/loginPage"
                                        from="/"
                                        className="text-white bg-blue-700 hover:bg-blue-800
                                                focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2"
                                    >
                                        {t("nav.logIn")}
                                    </Link>
                                )}
                            </div>
                        </li>
                    </ul>
                    <div className="md:hidden flex gap-2">
                        <LanguageSelect />
                        <DropdownMenu.Root modal={false}>
                            <DropdownMenu.Trigger
                                className="focus:outline-0 flex gap-2 items-center text-gray-900 rounded-full
                                hover:text-blue-600 md:me-0"
                            >
                                <span className="text-3xl font-semibold">
                                    <FiMenu />
                                </span>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    collisionPadding={10}
                                    className="z-50 min-w-[12rem] overflow-hidden rounded-lg bg-white shadow-md
                                        border-gray-300 border-[0.1px]"
                                    align="start"
                                    sideOffset={12}
                                >
                                    {currentUser && (
                                        <div className="w-full">
                                            <DropdownMenu.Item
                                                className={itemClassName}
                                                disabled={true}
                                            >
                                                <div className="flex items-center px-4 py-2 gap-3">
                                                    <img
                                                        src={userLogo}
                                                        alt="user logo"
                                                        className="h-6"
                                                    />
                                                    <span className="text-sm font-bold w-full h-full">
                                                        {currentUser.email}
                                                    </span>
                                                </div>
                                            </DropdownMenu.Item>
                                            <DropdownMenuSeparator className="h-[1px] bg-gray-300" />
                                        </div>
                                    )}
                                    {currentUser && (
                                        <DropdownMenu.Item
                                            className={itemClassName}
                                            asChild
                                            onSelect={() => {}}
                                        >
                                            <Link
                                                to="/manage"
                                                from="/"
                                                className="px-4 py-2 w-full h-full"
                                            >
                                                {t("nav.manageAccount")}
                                            </Link>
                                        </DropdownMenu.Item>
                                    )}
                                    <DropdownMenu.Item
                                        className={itemClassName}
                                        asChild
                                        onSelect={logOut}
                                    >
                                        {currentUser ? (
                                            <button className="text-red-500 px-4 py-2 w-full h-full">
                                                {t("nav.signOut")}
                                            </button>
                                        ) : (
                                            <Link
                                                to="/loginPage"
                                                className="w-full h-full px-4 py-2"
                                            >
                                                {t("nav.logIn")}
                                            </Link>
                                        )}
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </div>
                </div>
            </nav>
            <div className="w-full md:hidden">
                <ul
                    className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm shadow-md
                    py-1 text-center w-full rounded-md items-center justify-center"
                >
                    <li>
                        <Link
                            to="/profile"
                            search={{ page: "about" }}
                            className="text-gray-900 hover:underline"
                            aria-current="page"
                        >
                            {t("nav.aboutMe")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            search={{ page: "projects" }}
                            className="text-gray-900 hover:underline"
                        >
                            {t("nav.projects")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            search={{ page: "resume" }}
                            className="text-gray-900 hover:underline"
                        >
                            {t("nav.resume")}
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
