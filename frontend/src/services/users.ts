import axios from "axios";
import type { User } from "../models/user.ts";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const signUp = (newUser: User) => {
    return axios.post("/auth/signup", newUser);
}

export const loginUser = (user: User) => {
    return axios.post("/auth/login", user);
}

export const findUser = (email: string) => {
    return axios.get("/users", {params: {email: email}});
}

export const findUserById = async (id: string) => {
    return await axios.get("/users/:id", {params: {id: id}}).then(res => res.data);
}

export const updateUser = async (user: User) => {
    return await axios.post("/users/update", user).then(res => res.data);
}

export const authMe = () => {
    return axios.get("/auth/me");
}
