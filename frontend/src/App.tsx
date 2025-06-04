import './App.css';
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="main" element={<MainPage />} />
            </Routes>
        </>
    )
}

export default App
