import axios from "axios";
import type { User } from "../models/user.ts";

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const signUp = (newUser: User) => {
    return axios.post("/api/auth/signup", newUser);
}

export const loginUser = (user: User) => {
    return axios.post("/api/auth/login", user);
}

export const findUser = (email: string) => {
    return axios.get("/api/users", {params: {email: email}});
}

export const findUserById = async (id: string) => {
    return await axios.get("/api/users/:id", {params: {id: id}}).then(res => res.data);
}

export const updateUser = async (user: User) => {
    return await axios.post("/api/users/update", user).then(res => res.data);
}

export const authMe = () => {
    return axios.get("/api/auth/me");
}
