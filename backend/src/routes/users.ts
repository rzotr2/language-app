import { Router, Request, Response } from "express";
import { findUser, findUserById, updateUser } from "../services/users";
import { authMiddleware } from "../middlewares/auth";
import {UserType} from "../types/user";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const email = req.query.email;
    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
    }

    try {
        const user = await findUser(email as string);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await findUserById(req.query.id as string);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});

router.post("/update", authMiddleware, async (req: Request, res: Response) => {
    const user: UserType & { updateEmail: boolean } = req.body;

    if (!user.id) {
        res.status(400).json({ message: 'Id is required' });
        return;
    }

    try {
        if (user.updateEmail) {
            const foundUser = await findUser(user.email);

            if (foundUser) {
                res.status(403).json({message: "Email is already taken"});
                return;
            }
        }

        const updatedUser = await updateUser(user);
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(updatedUser);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});

export default router;
