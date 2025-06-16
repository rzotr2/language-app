import { create } from "zustand";

type AuthState = {
    loginEmail: string;
    signupEmail: string;
    loginPassword: string;
    signupPassword: string;
    confirmPassword: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
    confirmFieldTouched: boolean;
    userAlreadyExists: boolean;
    validEmail: boolean;
    validPassword: boolean;
    error: string | null;
    authSuccess: boolean;
    loading: boolean;
    setField: (key: string, value: string | null | boolean) => void;
    resetFields: () => void;
};

const initialState = {
    loginEmail: "",
    signupEmail: "",
    loginPassword: "",
    signupPassword: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    confirmFieldTouched: false,
    userAlreadyExists: false,
    validEmail: true,
    validPassword: true,
    error: null,
    authSuccess: false,
    loading: false,
};

export const useAuthState = create<AuthState>((set) => ({
    ...initialState,
    setField: (key, value) => set((state) => ({ ...state, [key]: value })),
    resetFields: () => set({ ...initialState }),
}));
