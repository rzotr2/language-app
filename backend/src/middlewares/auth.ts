import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({error: 'Not authorized'});
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof decoded === "string") {
            res.status(401).json({error: 'Not authorized'});
            return;
        } else {
            req.user = decoded;
        }

        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
}
