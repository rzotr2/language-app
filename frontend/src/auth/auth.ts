import { useAuthState } from "../store/auth.ts";
import { authMe } from "../services/users.ts";
import { redirect } from "@tanstack/react-router";

export const checkUserAuth = async (pathname?: string) => {
    const authState = useAuthState.getState();

    if (authState.isAuthenticated) {
        return;
    } else {
        try {
            const user = await authMe();

            if (user) {
                authState.setFieldAuth("currentUser", user.data);
                authState.setFieldAuth("isAuthenticated", true);
                return;
            }
        } catch (err) {
            if (pathname === "/workPage" || pathname === "/mainPage" || pathname === "/manage") {
                throw redirect({ to: "/loginPage" });
            }
        }
    }
};
