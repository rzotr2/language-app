import logo from "../assets/svg/logo.svg";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { DropdownMenu } from "radix-ui";
import { FiMenu } from "react-icons/fi";
import userLogo from "../assets/svg/userLogo.svg";
import { findUserById } from "../services/users.ts";
import type { User } from "../models/user.ts";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export default function HeaderGeneral() {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const itemClassName =
        "relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none transition-colors " +
        "focus:bg-slate-50 data-[disabled]:pointer-events-none data-[disabled]:bg-white hover:bg-gray-100";

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await axios.get("api/auth/me");
                const user = await findUserById(data.data.id);
                if (user) {
                    localStorage.setItem("currentUserId", user._id);
                    localStorage.setItem("currentUserLanguage", user.language);
                    setCurrentUser(user);
                }
            } catch (err) {
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const logOut = async () => {
        try {
            await axios.get("api/auth/logout");
            navigate("/login");
            setCurrentUser(null);
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
                            <a
                                href="#"
                                className="cursor-pointer hover:underline"
                            >
                                About Me
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline"
                            >
                                Projects
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="cursor-pointer hover:underline"
                            >
                                Resume
                            </a>
                        </li>
                        <li>
                            {loading ? (
                                <div
                                    role="status"
                                    className="min-w-[50px] flex justify-center"
                                >
                                    <div className="Buttons"></div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    {currentUser ? (
                                        <DropdownMenu.Root>
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
                                                    className="z-50 min-w-[12rem] overflow-hidden rounded-lg bg-white shadow-md
                                                        border-gray-300 border-[0.1px] me-1"
                                                    align="center"
                                                    sideOffset={12}
                                                >
                                                    <DropdownMenu.Item
                                                        className={itemClassName}
                                                        disabled={true}
                                                    >
                                                        <div className="flex items-center mx-auto">
                                                            <img
                                                                src={userLogo}
                                                                alt="user logo"
                                                                className="h-6"
                                                            />
                                                            <span className="text-sm font-bold px-4 py-2 w-full h-full cursor-">
                                                                {currentUser.email}
                                                            </span>
                                                        </div>
                                                    </DropdownMenu.Item>
                                                    <DropdownMenuSeparator className="h-[1px] bg-gray-300" />
                                                    <DropdownMenu.Item className={itemClassName}>
                                                        <Link
                                                            to="#"
                                                            className="px-4 py-2 w-full h-full"
                                                        >
                                                            Manage account
                                                        </Link>
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Item className={itemClassName}>
                                                        <Link
                                                            to="#"
                                                            className="px-4 py-2 w-full h-full"
                                                        >
                                                            Feedback
                                                        </Link>
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Item className={itemClassName}>
                                                        <button
                                                            onClick={logOut}
                                                            className="text-red-500 px-4 py-2 w-full h-full text-start cursor-pointer"
                                                        >
                                                            Sign out
                                                        </button>
                                                    </DropdownMenu.Item>
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Portal>
                                        </DropdownMenu.Root>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="text-white bg-blue-700 hover:bg-blue-800
                                                focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2"
                                        >
                                            Log in
                                        </Link>
                                    )}
                                </>
                            )}
                        </li>
                    </ul>
                    <div className="md:hidden">
                        <DropdownMenu.Root>
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
                                    className="z-50 min-w-[12rem] overflow-hidden rounded-lg bg-white shadow-md
                                        border-gray-300 border-[0.1px] me-1"
                                    align="start"
                                    sideOffset={12}
                                >
                                    {currentUser && (
                                        <div className="w-full">
                                            <DropdownMenu.Item
                                                className={itemClassName}
                                                disabled={true}
                                            >
                                                <div className="flex items-center mx-auto">
                                                    <img
                                                        src={userLogo}
                                                        alt="user logo"
                                                        className="h-6"
                                                    />
                                                    <span className="text-sm font-bold px-4 py-2 w-full h-full cursor-">
                                                        {currentUser.email}
                                                    </span>
                                                </div>
                                            </DropdownMenu.Item>
                                            <DropdownMenuSeparator className="h-[1px] bg-gray-300" />
                                        </div>
                                    )}
                                    {currentUser && (
                                        <DropdownMenu.Item className={itemClassName}>
                                            <Link
                                                to="#"
                                                className="px-4 py-2 w-full h-full"
                                            >
                                                Manage account
                                            </Link>
                                        </DropdownMenu.Item>
                                    )}
                                    <DropdownMenu.Item className={itemClassName}>
                                        <Link
                                            to="#"
                                            className="px-4 py-2 w-full h-full"
                                        >
                                            Feedback
                                        </Link>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        className={itemClassName}
                                        asChild
                                    >
                                        {currentUser ? (
                                            <button
                                                onClick={logOut}
                                                className="text-red-500 px-4 py-2 w-full h-full"
                                            >
                                                Sign out
                                            </button>
                                        ) : (
                                            <Link
                                                to="/login"
                                                className="w-full h-full px-4 py-2"
                                            >
                                                Log in
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
                        <a
                            href="#"
                            className="text-gray-900 hover:underline"
                            aria-current="page"
                        >
                            About me
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-900 hover:underline"
                        >
                            Projects
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-gray-900 hover:underline"
                        >
                            Resume
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
