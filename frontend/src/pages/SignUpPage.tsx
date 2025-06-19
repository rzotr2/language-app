import { Callout } from "@radix-ui/themes";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { signUp, findUser } from "../services/users.ts";
import axios from "axios";
import { BiInfoCircle } from "react-icons/bi";
import { useAuthState } from "../../store/users.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Inputs = {
    signUpEmail: string;
    signUpPassword: string;
    confirmPassword: string;
};

function SignUpPage() {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
    const passwordRegex = /^.{8,}$/;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const {
        showPassword,
        showConfirmPassword,
        userAlreadyExists,
        error,
        authSuccess,
        setFieldAuth,
    } = useAuthState();

    const handleSignupSubmit = () => {
        findUser(watch("signUpEmail"))
            .then(() => {
                setFieldAuth("userAlreadyExists", true);
            })
            .catch((err) => {
                if (axios.isAxiosError(err) && err.response) {
                    if (err.response.status === 404) {
                        setFieldAuth("userAlreadyExists", false);
                        signUp({
                            email: watch("signUpEmail"),
                            password: watch("signUpPassword"),
                        }).then((user) => {
                            setFieldAuth("currentUserData", user.data);
                            setFieldAuth("authSuccess", true);
                            setFieldAuth("error", null);
                            setTimeout(() => {
                                navigate("/main");
                                setFieldAuth("authSuccess", false);
                                setFieldAuth("showPassword", false);
                                setFieldAuth("showConfirmPassword", false);
                            }, 1500);
                            errors.signUpEmail = undefined;
                            errors.signUpPassword = undefined;
                            errors.confirmPassword = undefined;
                        });
                    } else {
                        setFieldAuth("error", err.response.data.message);
                    }
                } else {
                    setFieldAuth("error", `${t("signup.error.noResponse")}`);
                }
            });
    };

    return (
        <>
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <div className="w-[300px]">
                    <div className="flex w-full border-gray-400 border-b-1 mb-4 text-sm items-center gap-2">
                        <div className="p-1.5">
                            <Link
                                to="/login"
                                className="px-1 py-0.5 hover:bg-gray-100 rounded-sm"
                            >
                                {t("signup.login")}
                            </Link>
                        </div>
                        <div className="p-1.5 border-b-1 border-blue-600">
                            <button className="px-1 py-0.5 hover:bg-gray-100 rounded-sm font-semibold">
                                {t("signup.signup")}
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(handleSignupSubmit)}>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                {t("signup.yourEmail")}
                            </label>
                            <input
                                {...register("signUpEmail", {
                                    required: `${t("signup.error.required")}`,
                                    pattern: {
                                        value: emailRegex,
                                        message: `${t("signup.error.emailFormat")}`,
                                    },
                                })}
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                    block w-full p-2.5 focus:outline-0 mb-1"
                                placeholder="email@example.com"
                                required
                            />
                            {errors.signUpEmail && (
                                <Callout.Root
                                    color="red"
                                    size="1"
                                    className="mt-2 mb-4"
                                >
                                    <Callout.Icon>
                                        <BiInfoCircle />
                                    </Callout.Icon>
                                    <Callout.Text>{errors.signUpEmail.message}</Callout.Text>
                                </Callout.Root>
                            )}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                {t("signup.yourPassword")}
                            </label>
                            <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between">
                                <input
                                    {...register("signUpPassword", {
                                        pattern: {
                                            value: passwordRegex,
                                            message: `${t("signup.error.passwordFormat")}`,
                                        },
                                        required: `${t("signup.error.required")}`,
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="text-gray-900 text-sm rounded-lg focus:outline-0 block w-full p-2.5"
                                    required
                                    placeholder={`${t("signup.passwordPlaceholder")}`}
                                />
                                <div
                                    className="p-2 cursor-pointer"
                                    onClick={() => setFieldAuth("showPassword", !showPassword)}
                                >
                                    {showPassword ? (
                                        <IoMdEye className="text-xl" />
                                    ) : (
                                        <IoMdEyeOff className="text-xl" />
                                    )}
                                </div>
                            </div>
                            {errors.signUpPassword && (
                                <Callout.Root
                                    color="red"
                                    size="1"
                                    className="mt-2 mb-4"
                                >
                                    <Callout.Icon>
                                        <BiInfoCircle />
                                    </Callout.Icon>
                                    <Callout.Text>{errors.signUpPassword.message}</Callout.Text>
                                </Callout.Root>
                            )}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                {t("signup.confirmPassword")}
                            </label>
                            <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between mb-1">
                                <input
                                    {...register("confirmPassword", {
                                        validate: (value: string) =>
                                            value === watch("signUpPassword") ||
                                            `${t("signup.error.passwordsMatch")}`,
                                    })}
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    className="text-gray-900 text-sm rounded-lg focus:outline-0 block w-full p-2.5"
                                    required
                                    placeholder={`${t("signup.confirmPasswordPlaceholder")}`}
                                />
                                <div
                                    className="p-2 cursor-pointer"
                                    onClick={() =>
                                        setFieldAuth("showConfirmPassword", !showConfirmPassword)
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <IoMdEye className="text-xl" />
                                    ) : (
                                        <IoMdEyeOff className="text-xl" />
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {errors.confirmPassword && (
                                    <Callout.Root
                                        color="red"
                                        size="1"
                                        className="mt-2 mb-4"
                                    >
                                        <Callout.Icon>
                                            <BiInfoCircle />
                                        </Callout.Icon>
                                        <Callout.Text>
                                            {errors.confirmPassword.message}
                                        </Callout.Text>
                                    </Callout.Root>
                                )}
                                {userAlreadyExists && (
                                    <Callout.Root
                                        color="red"
                                        size="1"
                                        className="mt-2 mb-4"
                                    >
                                        <Callout.Icon>
                                            <BiInfoCircle />
                                        </Callout.Icon>
                                        <Callout.Text>{t("signup.error.emailTaken")}</Callout.Text>
                                    </Callout.Root>
                                )}
                                {error && (
                                    <Callout.Root
                                        color="red"
                                        size="1"
                                        className="mt-2 mb-4"
                                    >
                                        <Callout.Icon>
                                            <BiInfoCircle />
                                        </Callout.Icon>
                                        <Callout.Text>{error}</Callout.Text>
                                    </Callout.Root>
                                )}
                                {authSuccess && (
                                    <Callout.Root color="green">
                                        <Callout.Icon>
                                            <BiInfoCircle />
                                        </Callout.Icon>
                                        <Callout.Text>{t("signup.success")}</Callout.Text>
                                    </Callout.Root>
                                )}
                            </div>
                        </div>
                        <div className="space-x-5 flex items-center justify-end">
                            <Link
                                to="/"
                                className="group text-sm font-medium flex items-center"
                            >
                                <IoChevronBackOutline className="transition-all group-hover:me-1 group-hover:text-blue-500" />
                                <span className="transition-colors group-hover:text-blue-500">
                                    {t("signup.back")}
                                </span>
                            </Link>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800
                                                        focus:outline-none font-medium rounded-lg text-sm w-[130px]
                                                        px-5 py-2.5 text-center flex gap-3 justify-center items-center"
                            >
                                {authSuccess && (
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-4 h-4 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                )}
                                {t("signup.signUp")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;
