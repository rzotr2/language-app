import './App.css';
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import RequireAuth from "./auth/RequireAuth.tsx";
import WorkPage from "./pages/WorkPage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="main" element={
                    <RequireAuth>
                        <MainPage />
                    </RequireAuth>
                } />
                <Route path="workpage" element={
                    <RequireAuth>
                        <WorkPage />
                    </RequireAuth>
                } />
            </Routes>
        </>
    )
}

export default App
