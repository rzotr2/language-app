import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user";
import { sendUser } from "../services/users";

const router = Router();

interface User {
    email: string;
    password: string;
}

router.post("/signup", async (req: Request, res: Response) => {
    const user: User = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        const createdUser = await sendUser(user);
        const payload = { userId: createdUser._id };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
        });

        res.status(200).json({id: createdUser._id, email: createdUser.email});

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

router.post(
    '/login',
    async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email }).exec();
            if (!user) {
                res.status(401).send('Wrong password or email');
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).send('Wrong password or email');
                return;
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET!,
                { expiresIn: '1h' }
            );

            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 1000 * 60 * 60, // 1 година
                })
                .status(200)
                .json(user);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
);

router.get('/me', (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json("Token is missing");
        return;
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
        res.json({ id: payload.userId, email: payload.email});
    } catch {
        res.status(401).json("Unauthorized. Access denied");
    }
})

router.get('/logout', (_req: Request, res: Response) => {
    res
        .clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })
        .redirect('http://localhost:5173/login');
})

export default router;