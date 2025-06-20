import { useAuthState } from "../../store/auth.ts";
import { authMe } from "../services/users.ts";
import { redirect } from "@tanstack/react-router";

export const checkUserAuth = async (pathname?: string) => {
    const { isAuthenticated } = useAuthState.getState();
    if (!isAuthenticated) {
        try {
            const auth = useAuthState.getState();
            const user = await authMe();
            if (user) {
                auth.setFieldAuth("currentUser", user.data);
                auth.setFieldAuth("isAuthenticated", true);
                return;
            } else {
                if (
                    pathname === "/workPage" ||
                    pathname === "/mainPage" ||
                    pathname === "/manage"
                ) {
                    throw redirect({ to: "/loginPage" });
                }
            }
        } catch (err) {
            if (pathname === "/workPage" || pathname === "/mainPage" || pathname === "/manage") {
                throw redirect({ to: "/loginPage" });
            }
        }
    } else {
        return;
    }
};
