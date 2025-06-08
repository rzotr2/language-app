import dotenv from "dotenv";
import User from "../models/user";
import bcrypt from "bcrypt";
import { UserType } from "../types/user";

dotenv.config();

const uri: string = process.env.MONGODB_URI!;
if (!uri) {
    throw new Error("Missing MONGODB_URI in .env");
}

export async function sendUser(user: UserType){
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const newUser = new User(user);
    newUser.password = await bcrypt.hash(user.password, salt);

    await newUser.save();

    return newUser;
}

export async function findUser(email: string){
    return User.findOne({email: email});
}

export async function findUserById(id: string){
    return User.findOne({_id: id});
}

export async function updateUser(user: { id: string, language: string, level: string, interests: string, goals: string }){
    const { id, language, level, interests, goals } = user;
    return User.findByIdAndUpdate(id, { language, level, interests, goals }, {new: true});
}
