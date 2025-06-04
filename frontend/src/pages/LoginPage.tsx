import {type FormEvent, useState} from "react";
import { Box, Tabs } from "@radix-ui/themes";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmFieldTouched, setConfirmFieldTouched] = useState(false);

    const resetFields = () => {
        setLoginEmail("");
        setSignupEmail("");
        setLoginPassword("");
        setSignupPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
        setConfirmFieldTouched(false);
    };

    const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    };

    const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
                                    <div className="mb-5">
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            Your email
                                        </label>
                                        <input onChange={(e) => setLoginEmail(e.currentTarget.value)}
                                               type="email" id="email" value={loginEmail}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-0"
                                               placeholder="email@example.com" required/>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            Your password
                                        </label>
                                        <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between">
                                            <input onChange={(e) => setLoginPassword(e.currentTarget.value)}
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
                                    </div>
                                    <div className="flex items-center justify-end gap-5">
                                        <a
                                            href="/"
                                            className="group text-sm font-medium flex items-center"
                                        >
                                            <IoChevronBackOutline className="transition-all group-hover:me-1 group-hover:text-blue-500" />
                                            <span className="transition-colors group-hover:text-blue-500">Back</span>
                                        </a>
                                        {loginEmail && loginPassword ? (
                                            <button type="submit"
                                                    className="text-white bg-blue-700 hover:bg-blue-800
                                                focus:outline-none font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center">
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
                                        <input onChange={(e) => setSignupEmail(e.currentTarget.value)}
                                               type="email" id="email" value={signupEmail}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-0"
                                               placeholder="email@example.com" required/>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="signuppassword"
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            Your password
                                        </label>
                                        <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between">
                                            <input onChange={(e) => setSignupPassword(e.currentTarget.value)}
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
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="confirmPassword"
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            Confirm your password
                                        </label>
                                        <div className="bg-gray-50 border border-gray-300 items-center rounded-lg w-full flex justify-between">
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
                                        {signupPassword !== confirmPassword && confirmFieldTouched && (
                                            <span className="text-red-500">Your passwords should match</span>
                                        )}
                                    </div>
                                    <div className="space-x-5 flex items-center justify-end">
                                        <a
                                            href="/"
                                            className="group text-sm font-medium flex items-center"
                                        >
                                            <IoChevronBackOutline className="transition-all group-hover:me-1 group-hover:text-blue-500" />
                                            <span className="transition-colors group-hover:text-blue-500">Back</span>
                                        </a>
                                        {signupEmail && signupPassword && confirmPassword === signupPassword ? (
                                            <button type="submit"
                                                    className="text-white bg-blue-700 hover:bg-blue-800
                                                        focus:outline-none font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center">
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
