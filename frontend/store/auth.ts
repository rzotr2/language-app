import { create } from "zustand";
import type { User } from "../src/models/user.ts";

type AuthState = {
    isAuthenticated: boolean;
    currentUser: User | null;
    setFieldAuth: (key: string, value: null | boolean | User) => void;
};

const initialState = {
    isAuthenticated: false,
    currentUser: null,
};

export const useAuthState = create<AuthState>((set) => ({
    ...initialState,
    setFieldAuth: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
