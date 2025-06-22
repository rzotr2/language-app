import { createFileRoute } from "@tanstack/react-router";
import { checkUserAuth } from "../auth/auth.ts";
import { useAuthState } from "../store/auth.ts";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import type { LanguageOption } from "../types";
import { type FormEvent, useEffect, useState } from "react";
import type { User } from "../models/user.ts";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Box, Callout, Flex, RadioCards } from "@radix-ui/themes";
import { changePassword, findUserById, updateUser } from "../services/users.ts";
import { Collapsible } from "radix-ui";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { BiInfoCircle } from "react-icons/bi";
import axios from "axios";

export const Route = createFileRoute("/manage")({
    loader: async () => {
        await checkUserAuth("/manage");
    },
    component: Manage,
});

const languageOptions: LanguageOption[] = [
    { value: "en", label: "English 🇬🇧" },
    { value: "de", label: "Deutsch 🇩🇪" },
    { value: "uk", label: "Ukrainian 🇺🇦" },
    { value: "fr", label: "French 🇫🇷" },
    { value: "es", label: "Spanish 🇪🇸" },
    { value: "pl", label: "Polish 🇵🇱" },
    { value: "cz", label: "Czech 🇨🇿" },
];

function Manage() {
    useEffect(() => {
        (async () => {
            if (currentUser) {
                setCurrentUserData(currentUser);
            }
        })();
    }, []);

    const { currentUser, setFieldAuth } = useAuthState();
    const [currentUserData, setCurrentUserData] = useState<User | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [emailToUpdate, setEmailToUpdate] = useState(currentUserData?.email);
    const [newPasswordToUpdate, setNewPasswordToUpdate] = useState<string | null>(null);
    const [oldPasswordToUpdate, setOldPasswordToUpdate] = useState<string | null>(null);
    const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
    const [changePasswordSuccess, setChangePasswordSuccess] = useState<string | null>(null);
    const [formSubmitSuccess, setFormSubmitSuccess] = useState<string | null>(null);
    const [collapsibleOpened, setCollapsibleOpened] = useState(false);
    const [updatedNativeLanguage, setUpdatedNativeLanguage] = useState(
        currentUserData?.nativeLanguage,
    );
    const [updatedLanguageToLearn, setUpdatedLanguageToLearn] = useState(
        currentUserData?.languageToLearn,
    );
    const [updatedFirstName, setUpdatedFirstName] = useState(currentUserData?.firstName);
    const [updatedLastName, setUpdatedLastName] = useState(currentUserData?.lastName);
    const [updatedLanguageLevel, setUpdatedLanguageLevel] = useState(currentUserData?.level);
    const [updatedInterests, setUpdatedInterests] = useState(currentUserData?.interests);
    const [updatedGoals, setUpdatedGoals] = useState(currentUserData?.goals);

    const { t } = useTranslation();

    const handleUpdateSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userId = currentUserData?._id;
        if (userId) {
            const existingUser: User = await findUserById(userId);
            if (existingUser) {
                const updatedUser: User = {
                    ...currentUserData,
                    id: userId,
                    firstName: updatedFirstName,
                    lastName: updatedLastName,
                    email: emailToUpdate as string,
                    languageToLearn: updatedLanguageToLearn,
                    nativeLanguage: updatedNativeLanguage,
                    level: updatedLanguageLevel,
                    interests: updatedInterests,
                    goals: updatedGoals,
                };
                const responseUpdatedUser = await updateUser(updatedUser);
                setFieldAuth("currentUser", responseUpdatedUser);
                setFormSubmitSuccess(t("account.changesApplied"));
                setCurrentUserData(responseUpdatedUser);
            }
        }
    };

    const handlePasswordChange = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setChangePasswordError(null);
        setChangePasswordSuccess(null);

        const userId = currentUserData?._id;
        if (userId) {
            const existingUser: User = await findUserById(userId);
            if (existingUser) {
                try {
                    if (newPasswordToUpdate && oldPasswordToUpdate) {
                        if (newPasswordToUpdate.length < 8) {
                            console.log(newPasswordToUpdate.length);
                            setChangePasswordError(t("account.password.minLength"));
                        } else {
                            await changePassword(
                                existingUser.email,
                                newPasswordToUpdate,
                                oldPasswordToUpdate,
                            );
                            setChangePasswordSuccess(t("account.password.success"));
                            setNewPasswordToUpdate(null);
                            setOldPasswordToUpdate(null);
                        }
                    } else {
                        setChangePasswordError(t("account.password.enterBoth"));
                    }
                } catch (err) {
                    if (axios.isAxiosError(err) && err.response) {
                        setChangePasswordError(err.response.data);
                    } else {
                        setChangePasswordError(t("account.password.unknownError"));
                    }
                }
            }
        }
    };

    return (
        <div className="container mx-auto max-w-[98%] md:max-w-[80vw] lg:max-w-[60vw] shadow-xl mt-5 sm:my-8">
            <div
                className="mx-auto rounded-t-2xl bg-gradient-to-r from-blue-600
                to-indigo-600 shadow-lg px-5 md:px-7 py-3 md:py-5 text-white flex flex-col items-start"
            >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                    {t("accountManage.title")}
                </h2>
                <p className="text-md sm:text-lg md:text-2xl font-normal opacity-90">
                    {t("accountManage.subtitle")}
                </p>
            </div>
            <form onSubmit={handleUpdateSubmit}>
                <div className="flex items-center mx-auto flex-wrap sm:flex-nowrap gap-5 w-[95%] mt-5">
                    <div className="w-full sm:w-1/2">
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            {t("accountManage.form.firstName")}
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            onInput={(event) => setUpdatedFirstName(event.currentTarget.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder={currentUserData?.firstName || "John"}
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            {t("accountManage.form.lastName")}
                        </label>
                        <input
                            onInput={(event) => setUpdatedLastName(event.currentTarget.value)}
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={currentUserData?.lastName || "Doe"}
                        />
                    </div>
                </div>
                <div className="flex items-center mx-auto flex-wrap sm:flex-nowrap gap-5 w-[95%] mt-5">
                    <div className="w-full sm:w-1/2">
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            {t("accountManage.form.yourCurrentEmail")}
                        </label>
                        <input
                            type="email"
                            disabled={true}
                            id="first_name"
                            onInput={(event) => setEmailToUpdate(event.currentTarget.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed opacity-80"
                            placeholder={currentUserData?.email || "email"}
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            {t("accountManage.form.newEmail")}
                        </label>
                        <input
                            type="email"
                            id="first_name"
                            onInput={(event) => setEmailToUpdate(event.currentTarget.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder={"Email"}
                        />
                    </div>
                </div>
                <Collapsible.Root className="w-[95%] mx-auto my-5">
                    <div className="flex justify-end">
                        <Collapsible.Trigger
                            onClick={() => setCollapsibleOpened(!collapsibleOpened)}
                            className="bg-red-500 text-white px-3 py-1.5 cursor-pointer rounded-t-md gap-3
                            flex items-center justify-end font-medium hover:bg-red-400 transition-colors"
                        >
                            {t("accountManage.form.changePassword")}
                            {collapsibleOpened ? (
                                <FaChevronUp className="text-base" />
                            ) : (
                                <FaChevronDown className="text-base" />
                            )}
                        </Collapsible.Trigger>
                    </div>
                    <Collapsible.Content
                        className="CollapsibleContent text-sm bg-gray-50
                         text-blue-900 rounded-b-md p-4 space-y-3"
                    >
                        <div>
                            <div className="flex items-center mx-auto flex-wrap sm:flex-nowrap gap-5 w-[95%] mt-5">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        htmlFor="first_name"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        {t("accountManage.form.oldPassword")}
                                    </label>
                                    <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            className="text-gray-900 text-sm rounded-lg focus:outline-0 block w-full p-2.5"
                                            placeholder={`${t("login.passwordPlaceholder")}`}
                                            minLength={8}
                                            onInput={(event) =>
                                                setOldPasswordToUpdate(
                                                    event.currentTarget.value as string,
                                                )
                                            }
                                        />
                                        <div
                                            className="p-2 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <IoMdEye className="text-xl" />
                                            ) : (
                                                <IoMdEyeOff className="text-xl" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label
                                        htmlFor="first_name"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        {t("accountManage.form.newPassword")}
                                    </label>
                                    <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            id="password"
                                            className="text-gray-900 text-sm rounded-lg focus:outline-0 block w-full p-2.5"
                                            placeholder={`${t("login.passwordPlaceholder")}`}
                                            minLength={8}
                                            onInput={(event) =>
                                                setNewPasswordToUpdate(event.currentTarget.value)
                                            }
                                        />
                                        <div
                                            className="p-2 cursor-pointer"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? (
                                                <IoMdEye className="text-xl" />
                                            ) : (
                                                <IoMdEyeOff className="text-xl" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-5">
                                <button
                                    onClick={handlePasswordChange}
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                    dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                                    dark:focus:ring-blue-800 cursor-pointer"
                                >
                                    {t("accountManage.form.changePassword")}
                                </button>
                            </div>
                        </div>
                        {changePasswordError && (
                            <Callout.Root
                                color="red"
                                size="1"
                                className="mt-2 mb-4"
                            >
                                <Callout.Icon>
                                    <BiInfoCircle />
                                </Callout.Icon>
                                <Callout.Text>{changePasswordError}</Callout.Text>
                            </Callout.Root>
                        )}
                        {changePasswordSuccess && (
                            <Callout.Root
                                color="green"
                                size="1"
                                className="mt-2 mb-4"
                            >
                                <Callout.Icon>
                                    <BiInfoCircle />
                                </Callout.Icon>
                                <Callout.Text>{changePasswordSuccess}</Callout.Text>
                            </Callout.Root>
                        )}
                    </Collapsible.Content>
                </Collapsible.Root>
                <div className="space-y-3 my-5">
                    <div className="flex items-center mx-auto flex-wrap sm:flex-nowrap gap-5 w-[95%]">
                        <div className="flex-col justify-center items-center w-full sm:w-1/2">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                {t("accountManage.iSpeak")}
                            </label>
                            {currentUserData?.nativeLanguage && (
                                <Select
                                    isSearchable={false}
                                    className="w-full text-center"
                                    defaultValue={
                                        languageOptions.find((lang) => {
                                            return currentUser?.nativeLanguage === lang.value;
                                        }) ?? null
                                    }
                                    onChange={(option) => {
                                        setUpdatedNativeLanguage(option?.value);
                                    }}
                                    options={languageOptions}
                                />
                            )}
                            {!currentUserData?.nativeLanguage && (
                                <Select
                                    isSearchable={false}
                                    className="md:w-[160px] text-center"
                                    onChange={(option) => {
                                        setUpdatedNativeLanguage(option?.value);
                                    }}
                                    options={languageOptions}
                                />
                            )}
                        </div>
                        <div className="flex-col justify-center items-center w-full sm:w-1/2">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                {t("accountManage.iWantToLearn")}
                            </label>
                            {currentUserData?.languageToLearn && (
                                <Select
                                    isSearchable={false}
                                    className="w-full text-center"
                                    defaultValue={
                                        languageOptions.find((lang) => {
                                            return currentUser?.languageToLearn === lang.value;
                                        }) ?? null
                                    }
                                    onChange={(option) => {
                                        setUpdatedLanguageToLearn(option?.value);
                                    }}
                                    options={languageOptions}
                                />
                            )}
                            {!currentUserData?.languageToLearn && (
                                <Select
                                    isSearchable={false}
                                    className="md:w-[160px] text-center"
                                    onChange={(option) => {
                                        setUpdatedLanguageToLearn(option?.value);
                                    }}
                                    options={languageOptions}
                                />
                            )}
                        </div>
                    </div>
                    <Box className="w-[95%] mx-auto py-4">
                        <p>{t("accountManage.level.title")}</p>
                        <RadioCards.Root
                            defaultValue={currentUserData?.level}
                            columns={{ initial: "1", sm: "3" }}
                            onValueChange={(value) => setUpdatedLanguageLevel(value)}
                            className="pt-2"
                        >
                            <RadioCards.Item value="A1">
                                <Flex
                                    direction="column"
                                    width="100%"
                                >
                                    <p className="font-bold">{t("accountManage.level.A1.label")}</p>
                                    <p>{t("accountManage.level.A1.desc")}</p>
                                </Flex>
                            </RadioCards.Item>
                            <RadioCards.Item value="A2">
                                <Flex
                                    direction="column"
                                    width="100%"
                                >
                                    <p className="font-bold">{t("accountManage.level.A2.label")}</p>
                                    <p>{t("accountManage.level.A2.desc")}</p>
                                </Flex>
                            </RadioCards.Item>
                            <RadioCards.Item value="B1">
                                <Flex
                                    direction="column"
                                    width="100%"
                                >
                                    <p className="font-bold">{t("accountManage.level.B1.label")}</p>
                                    <p>{t("accountManage.level.B1.desc")}</p>
                                </Flex>
                            </RadioCards.Item>
                            <RadioCards.Item value="B2">
                                <Flex
                                    direction="column"
                                    width="100%"
                                >
                                    <p className="font-bold">{t("accountManage.level.B2.label")}</p>
                                    <p>{t("accountManage.level.B2.desc")}</p>
                                </Flex>
                            </RadioCards.Item>
                            <RadioCards.Item value="C1">
                                <Flex
                                    direction="column"
                                    width="100%"
                                >
                                    <p className="font-bold">{t("accountManage.level.C1.label")}</p>
                                    <p>{t("accountManage.level.C1.desc")}</p>
                                </Flex>
                            </RadioCards.Item>
                            <RadioCards.Item value="C2">
                                <Flex
                                    direction="column"
                                    width="100%"
                                >
                                    <p className="font-bold">{t("accountManage.level.C2.label")}</p>
                                    <p>{t("accountManage.level.C2.desc")}</p>
                                </Flex>
                            </RadioCards.Item>
                        </RadioCards.Root>
                    </Box>
                </div>
                <div className="w-[95%] mx-auto">
                    <p>{t("accountManage.form.interests")}</p>
                    <textarea
                        onInput={(event) => {
                            setUpdatedInterests(event.currentTarget.value);
                        }}
                        id="message"
                        rows={6}
                        className="block p-2.5 my-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                  disabled:cursor-not-allowed border-gray-300 focus:ring-blue-500
                                  disabled:opacity-50 focus:border-blue-500"
                        placeholder={
                            currentUserData?.interests ||
                            t("accountManage.form.interestsPlaceholder")
                        }
                    ></textarea>
                    <p className="text-sm opacity-70 py-1">
                        {t("accountManage.form.interestsHint")}
                    </p>
                </div>
                <div className="w-[95%] mx-auto py-5">
                    <p>{t("accountManage.form.goals")}</p>
                    <textarea
                        onInput={(event) => {
                            setUpdatedGoals(event.currentTarget.value);
                        }}
                        id="message"
                        rows={6}
                        className="block p-2.5 my-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                                  disabled:cursor-not-allowed border-gray-300 focus:ring-blue-500
                                  disabled:opacity-50 focus:border-blue-500"
                        placeholder={
                            currentUserData?.goals || t("accountManage.form.goalsPlaceholder")
                        }
                    ></textarea>
                    <p className="text-sm opacity-70 py-1">{t("accountManage.form.goalsHint")}</p>
                    <div className="flex justify-end pt-5">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                            dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                            dark:focus:ring-blue-800 cursor-pointer"
                        >
                            {t("accountManage.form.submit")}
                        </button>
                    </div>
                    {formSubmitSuccess && (
                        <Callout.Root
                            color="green"
                            size="1"
                            className="mt-2 mb-4"
                        >
                            <Callout.Icon>
                                <BiInfoCircle />
                            </Callout.Icon>
                            <Callout.Text>{formSubmitSuccess}</Callout.Text>
                        </Callout.Root>
                    )}
                </div>
            </form>
        </div>
    );
}
