import dotenv from "dotenv";
import User from "../models/user";
import bcrypt from "bcrypt";
import { UserType } from "../types/user";
import {ObjectId} from "mongodb";

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

export async function updateUser(user: UserType){
    return User.findByIdAndUpdate(user.id, user, { new: true });
}

export async function updatePassword(id: ObjectId, newPassword: string) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    return User.findByIdAndUpdate( id, {password: hashedPassword }, {new: true});
}
