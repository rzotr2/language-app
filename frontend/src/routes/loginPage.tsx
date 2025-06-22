import { Callout } from "@radix-ui/themes";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "@tanstack/react-router";
import { loginUser } from "../services/users.ts";
import { BiInfoCircle } from "react-icons/bi";
import { useUserState } from "../store/users.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import { useAuthState } from "../store/auth.ts";

type Inputs = {
    email: string;
    password: string;
};

export const Route = createFileRoute("/loginPage")({
    component: LoginPage,
});

function LoginPage() {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
    const passwordRegex = /^.{8,}$/;

    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const { showPassword, error, authSuccess, setFieldUser, resetFields } = useUserState();
    const { setFieldAuth } = useAuthState();

    const handleLoginSubmit = async () => {
        loginUser({
            email: watch("email").toLowerCase(),
            password: watch("password"),
        })
            .then((user) => {
                setFieldAuth("currentUser", user.data);
                setFieldAuth("isAuthenticated", user.data);
                setFieldUser("authSuccess", true);
                setFieldUser("error", null);
                setTimeout(() => {
                    if (user.data.goals) {
                        navigate({ to: "/workPage", from: "/" }).then(() => resetFields());
                    } else {
                        navigate({ to: "/mainPage", from: "/" }).then(() => resetFields());
                    }
                }, 1500);
                errors.email = undefined;
                errors.password = undefined;
            })
            .catch((err) => {
                if (err.response) {
                    setFieldUser("error", err.response.data);
                } else if (err.request) {
                    setFieldUser("error", `${t("login.noResponse")}`);
                } else {
                    setFieldUser("error", err.message);
                }
            });
    };

    return (
        <>
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <div className="w-[300px]">
                    <div className="flex w-full border-gray-400 border-b-1 mb-4 text-sm items-center gap-2">
                        <div className="p-1.5 border-b-1 border-blue-600">
                            <button className="px-1 py-0.5 hover:bg-gray-100 rounded-sm font-semibold">
                                {t("login.login")}
                            </button>
                        </div>
                        <div className="p-1.5">
                            <Link
                                to="/signUpPage"
                                from="/"
                                className="px-1 py-0.5 hover:bg-gray-100 rounded-sm"
                            >
                                {t("login.signup")}
                            </Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(handleLoginSubmit)}>
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block mb-1 text-sm font-medium text-gray-900"
                            >
                                {t("login.yourEmail")}
                            </label>
                            <input
                                {...register("email", {
                                    required: "This field is required",
                                    pattern: {
                                        value: emailRegex,
                                        message: `${t("login.error.emailFormat")}`,
                                    },
                                })}
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                    block w-full p-2.5 focus:outline-0 mb-1"
                                placeholder="email@example.com"
                                required
                            />
                            {errors.email && (
                                <Callout.Root
                                    color="red"
                                    size="1"
                                    className="mt-2 mb-4"
                                >
                                    <Callout.Icon>
                                        <BiInfoCircle />
                                    </Callout.Icon>
                                    <Callout.Text>{errors.email.message}</Callout.Text>
                                </Callout.Root>
                            )}
                        </div>
                        <div className="mb-1">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                {t("login.yourPassword")}
                            </label>
                            <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between">
                                <input
                                    {...register("password", {
                                        pattern: {
                                            value: passwordRegex,
                                            message: `${t("login.error.passwordFormat")}`,
                                        },
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="text-gray-900 text-sm rounded-lg focus:outline-0 block w-full p-2.5"
                                    required
                                    placeholder={`${t("login.passwordPlaceholder")}`}
                                />
                                <div
                                    className="p-2 cursor-pointer"
                                    onClick={() => setFieldUser("showPassword", !showPassword)}
                                >
                                    {showPassword ? (
                                        <IoMdEye className="text-xl" />
                                    ) : (
                                        <IoMdEyeOff className="text-xl" />
                                    )}
                                </div>
                            </div>
                            {errors.password && (
                                <Callout.Root
                                    color="red"
                                    size="1"
                                    className="mt-2 mb-4"
                                >
                                    <Callout.Icon>
                                        <BiInfoCircle />
                                    </Callout.Icon>
                                    <Callout.Text>{errors.password.message}</Callout.Text>
                                </Callout.Root>
                            )}
                        </div>
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
                            <Callout.Root
                                color="green"
                                className="mt-2 mb-4"
                            >
                                <Callout.Icon>
                                    <BiInfoCircle />
                                </Callout.Icon>
                                <Callout.Text>{t("login.success")}</Callout.Text>
                            </Callout.Root>
                        )}
                        <div className="flex items-center justify-end gap-5 mt-5">
                            <Link
                                to="/"
                                from="/"
                                className="group text-sm font-medium flex items-center"
                            >
                                <IoChevronBackOutline className="transition-all group-hover:me-1 group-hover:text-blue-500" />
                                <span className="transition-colors group-hover:text-blue-500">
                                    {t("login.back")}
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
                                {t("login.logIn")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
