import { type ReactElement, useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";

interface Props {
    children: ReactElement;
}

export default function RequireAuth({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [ok, setOk] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await axios.get("/api/auth/me");
                setOk(true);
            } catch (err) {
                setOk(false);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div
                className="w-screen h-screen flex flex-col justify-center items-center
                fixed bg-gray-400 opacity-90 z-100"
            >
                <div className="Buttons mb-5"></div>
                <div className="text-center font-extrabold text-xl">
                    <p>Loading, please wait...</p>
                </div>
            </div>
        );
    }
    return ok ? (
        children
    ) : (
        <Navigate
            to="/login"
            replace
        />
    );
}
