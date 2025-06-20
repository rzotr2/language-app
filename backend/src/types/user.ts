import { JwtPayload } from "jsonwebtoken";

export type UserType = {
    email: string,
    password: string,
    id?: string,
    nativeLanguage?: string,
    languageToLearn?: string,
    level?: string,
    interests?: string,
    goals?: string,
    firstName?: string,
    lastName?: string,
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
