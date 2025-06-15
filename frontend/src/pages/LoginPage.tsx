import { type FormEvent, useState } from "react";
import { Box, Callout, Tabs } from "@radix-ui/themes";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { signUp, findUser, loginUser } from "../services/users.ts";
import axios from "axios";
import { BiInfoCircle } from "react-icons/bi";

function LoginPage() {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
    const passwordRegex = /^.{7,}$/;

    const [loginEmail, setLoginEmail] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmFieldTouched, setConfirmFieldTouched] = useState(false);
    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authSuccess, setAuthSuccess] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const errors = {
        email: "Wrong email format",
        password: "Password must have at least 8 characters"
    }

    const resetFields = () => {
        setLoginEmail("");
        setSignupEmail("");
        setLoginPassword("");
        setSignupPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
        setConfirmFieldTouched(false);
        setUserAlreadyExists(false);
        setValidEmail(true);
        setValidPassword(true);
        setError(null);
        setLoading(false);
        setAuthSuccess(false);
    };

    const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        loginUser({
            email: loginEmail,
            password: loginPassword
        }).then((user) => {
            setLoading(true);
            setTimeout(() => {
                if (user.data.goals) {
                    navigate("/workpage");
                } else {
                    navigate("/main");
                }
            }, 1500);
        })
            .catch(err => {
                if (err.response) {
                    setError(`${err.response.data}`);
                } else if (err.request) {
                    setError('No response from server');
                } else {
                    setError(err.message);
                }
            });
    };

    const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        findUser(signupEmail)
            .then(() => {
                setUserAlreadyExists(true);
                console.log("ALREADY EXISTS")
            })
            .catch(err => {
                if (axios.isAxiosError(err) && err.response) {
                    if (err.response.status === 404) {
                        setUserAlreadyExists(false);
                        signUp({
                            email: signupEmail,
                            password: signupPassword
                        }).then(() => setAuthSuccess(true));

                        setLoading(true);
                        setTimeout(() => {
                            navigate("/main");
                        }, 1500);

                    } else {
                        setError(err.response.data.message);
                    }
                } else {
                    setError('No response from server');
                }
        });
    };

    return (
        <>
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <div className="w-[300px]">
                    <Tabs.Root onValueChange={() => resetFields()} defaultValue="login">
                        <Tabs.List>
                            <Tabs.Trigger value="login">Login</Tabs.Trigger>
                            <Tabs.Trigger value="signup">Sign up</Tabs.Trigger>
                        </Tabs.List>
                        <Box pt="3">
                            <Tabs.Content value="login">
                                <form onSubmit={handleLoginSubmit}>
                                    <div className="mb-2">
                                        <label htmlFor="email"
                                               className="block mb-1 text-sm font-medium text-gray-900">
                                            Your email
                                        </label>
                                        <input onChange={(e) => {
                                                setLoginEmail(e.currentTarget.value);
                                                if (!emailRegex.test(loginEmail)) {
                                                    setValidEmail(false);
                                                } else {
                                                    setValidEmail(true);
                                                }
                                            }}
                                               type="email" id="email" value={loginEmail}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                               block w-full p-2.5 focus:outline-0 mb-1"
                                               placeholder="email@example.com" required/>
                                        {!validEmail && (
                                            <Callout.Root color="red" size="1" className="mt-2 mb-4">
                                                <Callout.Icon>
                                                    <BiInfoCircle />
                                                </Callout.Icon>
                                                <Callout.Text>
                                                    {errors.email}
                                                </Callout.Text>
                                            </Callout.Root>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            Your password
                                        </label>
                                        <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between">
                                            <input onChange={(e) => {
                                                setLoginPassword(e.currentTarget.value);
                                                if (!passwordRegex.test(loginPassword)) {
                                                    setValidPassword(false);
                                                } else {
                                                    setValidPassword(true);
                                                }
                                            }}
                                                   type={showPassword ? "text" : "password"} id="password" value={loginPassword}
                                                   className="text-gray-900 text-sm rounded-lg focus:outline-0 block w-full p-2.5"
                                                   required
                                                   placeholder="Password"
                                            />
                                            <div className="p-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? (
                                                    <IoMdEye className="text-xl" />
                                                ) : (
                                                    <IoMdEyeOff className="text-xl" />
                                                )}
                                            </div>
                                        </div>
                                        {!validPassword && (
                                            <Callout.Root color="red" size="1" className="mt-2 mb-4">
                                                <Callout.Icon>
                                                    <BiInfoCircle />
                                                </Callout.Icon>
                                                <Callout.Text>
                                                    {errors.password}
                                                </Callout.Text>
                                            </Callout.Root>
                                        )}
                                    </div>
                                    {error && (
                                        <Callout.Root color="red" size="1" className="mt-2 mb-4">
                                            <Callout.Icon>
                                                <BiInfoCircle />
                                            </Callout.Icon>
                                            <Callout.Text>
                                                {error}
                                            </Callout.Text>
                                        </Callout.Root>
                                    )}
                                    {authSuccess && (
                                        <Callout.Root color="green">
                                            <Callout.Icon>
                                                <BiInfoCircle />
                                            </Callout.Icon>
                                            <Callout.Text>
                                                Successfully logged in. Redirecting...
                                            </Callout.Text>
                                        </Callout.Root>
                                    )}
                                    <div className="flex items-center justify-end gap-5 mt-5">
                                        <Link
                                            to="/"
                                            className="group text-sm font-medium flex items-center"
                                        >
                                            <IoChevronBackOutline className="transition-all group-hover:me-1 group-hover:text-blue-500" />
                                            <span className="transition-colors group-hover:text-blue-500">Back</span>
                                        </Link>
                                        {loginEmail && loginPassword && validEmail && validPassword ? (
                                            <button type="submit"
                                                    className="text-white bg-blue-700 hover:bg-blue-800
                                                        focus:outline-none font-medium rounded-lg text-sm w-[130px]
                                                        px-5 py-2.5 text-center flex gap-3 justify-center items-center">
                                                {loading && (
                                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                                    </svg>
                                                )}
                                                Log in
                                            </button>
                                        ) : (
                                            <button type="button"
                                                    className="text-white bg-blue-400 cursor-not-allowed font-medium
                                                        rounded-lg text-sm px-5 py-2.5 text-center"
                                                    disabled>
                                                Log in
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </Tabs.Content>
                            <Tabs.Content value="signup">
                                <form onSubmit={handleSignupSubmit}>
                                    <div className="mb-5">
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            Your email
                                        </label>
                                        <input onChange={(e) => {
                                            setSignupEmail(e.currentTarget.value);
                                            if (!emailRegex.test(signupEmail)) {
                                                setValidEmail(false);
                                            } else {
                                                setValidEmail(true);
                                            }
                                        }}
                                               type="email" id="email" value={signupEmail}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                               block w-full p-2.5 focus:outline-0 mb-1"
                                               placeholder="email@example.com" required/>
                                        {!validEmail && (
                                            <Callout.Root color="red" size="1" className="mt-2 mb-4">
                                                <Callout.Icon>
                                                    <BiInfoCircle />
                                                </Callout.Icon>
                                                <Callout.Text>
                                                    {errors.email}
                                                </Callout.Text>
                                            </Callout.Root>
                                        )}
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="signuppassword"
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            Your password
                                        </label>
                                        <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between">
                                            <input onChange={(e) => {
                                                setSignupPassword(e.currentTarget.value);
                                                if (!passwordRegex.test(signupPassword)) {
                                                    setValidPassword(false);
                                                } else {
                                                    setValidPassword(true);
                                                }
                                            }}
                                                   type={showPassword ? "text" : "password"} id="signuppassword" value={signupPassword}
                                                   className="text-gray-900 text-sm rounded-lg focus:outline-0 block w-full p-2.5"
                                                   required
                                                   placeholder="Password"
                                            />
                                            <div className="p-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? (
                                                    <IoMdEye className="text-xl" />
                                                ) : (
                                                    <IoMdEyeOff className="text-xl" />
                                                )}
                                            </div>
                                        </div>
                                        {!validPassword && (
                                            <Callout.Root color="red" size="1" className="mt-2 mb-4">
                                                <Callout.Icon>
                                                    <BiInfoCircle />
                                                </Callout.Icon>
                                                <Callout.Text>
                                                    {errors.password}
                                                </Callout.Text>
                                            </Callout.Root>
                                        )}
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="confirmPassword"
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            Confirm your password
                                        </label>
                                        <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between mb-1">
                                            <input onChange={(event) => {
                                                setConfirmFieldTouched(true);
                                                setConfirmPassword(event.currentTarget.value);
                                            }}
                                                   placeholder="Confirm password"
                                                   type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword}
                                                   className="text-gray-900 text-sm rounded-lg focus:outline-0 block w-full p-2.5"
                                                   required/>
                                            <div className="p-2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? (
                                                    <IoMdEye className="text-xl" />
                                                ) : (
                                                    <IoMdEyeOff className="text-xl" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {signupPassword !== confirmPassword && confirmFieldTouched && (
                                                <Callout.Root color="red" size="1" className="mt-2 mb-4">
                                                    <Callout.Icon>
                                                        <BiInfoCircle />
                                                    </Callout.Icon>
                                                    <Callout.Text>
                                                        Your passwords should match
                                                    </Callout.Text>
                                                </Callout.Root>
                                            )}
                                            {userAlreadyExists && (
                                                <Callout.Root color="red" size="1" className="mt-2 mb-4">
                                                    <Callout.Icon>
                                                        <BiInfoCircle />
                                                    </Callout.Icon>
                                                    <Callout.Text>
                                                        Email is already taken.
                                                    </Callout.Text>
                                                </Callout.Root>
                                            )}
                                            {error && (
                                                <Callout.Root color="red" size="1" className="mt-2 mb-4">
                                                    <Callout.Icon>
                                                        <BiInfoCircle />
                                                    </Callout.Icon>
                                                    <Callout.Text>
                                                        {error}
                                                    </Callout.Text>
                                                </Callout.Root>
                                            )}
                                            {authSuccess && (
                                                <Callout.Root color="green">
                                                    <Callout.Icon>
                                                        <BiInfoCircle />
                                                    </Callout.Icon>
                                                    <Callout.Text>
                                                        Successfully signed up. Redirecting...
                                                    </Callout.Text>
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
                                            <span className="transition-colors group-hover:text-blue-500">Back</span>
                                        </Link>
                                        {signupEmail && signupPassword && confirmPassword === signupPassword && validPassword && validEmail ? (
                                            <button type="submit"
                                                    className="text-white bg-blue-700 hover:bg-blue-800
                                                        focus:outline-none font-medium rounded-lg text-sm w-[130px]
                                                        px-5 py-2.5 text-center flex gap-3 justify-center items-center">
                                                {loading && (
                                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                                    </svg>
                                                )}
                                                Sign up
                                            </button>
                                        ) : (
                                            <button type="button"
                                                    className="text-white bg-blue-400 cursor-not-allowed font-medium
                                                        rounded-lg text-sm px-5 py-2.5 text-center"
                                                    disabled>
                                                Sign up
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </Tabs.Content>
                        </Box>
                    </Tabs.Root>
                </div>
            </div>
        </>
    )
}

export default LoginPage
