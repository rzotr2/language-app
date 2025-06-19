import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import RequireAuth from "./auth/RequireAuth.tsx";
import WorkPage from "./pages/WorkPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";

function App() {
    // const [loading, setLoading] = useState<boolean>(false);
    // const { i18n } = useTranslation();
    // const { currentUserData, setFieldAuth } = useAuthState();

    // useEffect(() => {
    //     (async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get<User>("api/auth/me");
    //             const user = response.data;
    //             console.log(response);
    //             if (user) {
    //                 setFieldAuth("currentUserData", user);
    //                 if (user.nativeLanguage) {
    //                     i18n.changeLanguage(user.nativeLanguage);
    //                 }
    //             } else {
    //                 i18n.changeLanguage("en");
    //             }
    //         } catch (err) {
    //             setFieldAuth("currentUserData", null);
    //             i18n.changeLanguage("en");
    //         } finally {
    //             setLoading(false);
    //         }
    //     })();
    // }, []);

    return (
        <>
            {/*{loading && (*/}
            {/*    <div*/}
            {/*        className="w-screen h-screen flex flex-col justify-center items-center*/}
            {/*    fixed bg-gray-400 opacity-90 z-100"*/}
            {/*    >*/}
            {/*        <div className="Buttons mb-5"></div>*/}
            {/*    </div>*/}
            {/*)}*/}
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route
                            index
                            element={<HomePage />}
                        />
                        <Route
                            path="home"
                            element={<HomePage />}
                        />
                        <Route
                            path="login"
                            element={<LoginPage />}
                        />
                        <Route
                            path="signup"
                            element={<SignUpPage />}
                        />
                        <Route
                            path="main"
                            element={
                                <RequireAuth>
                                    <MainPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="workpage"
                            element={
                                <RequireAuth>
                                    <WorkPage />
                                </RequireAuth>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
