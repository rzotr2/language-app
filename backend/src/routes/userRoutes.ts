import { Router, Request, Response } from "express";

const router = Router();

interface User {
    id: number;
    email: string;
    password: string;
}

const userRoutes: User[] = [
    { id: 1, email: "lol@com.ua", password: "lolkek223" },
    { id: 2, email: "kek@x.ua", password: "keklol228" }
];

// Get all userRoutes
router.get("/users", (req: Request, res: Response) => {
    res.json(userRoutes);
});

// Get a user by ID
router.get("/users/:id", (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = userRoutes.find(b => b.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Create a new user
router.post("/users", (req: Request, res: Response) => {
    const newUser: User = {
        id: userRoutes.length + 1,
        email: req.body.title,
        password: req.body.author
    };
    userRoutes.push(newUser);
    res.status(201).json(userRoutes);
});

// Update a user by ID
router.put("/users/:id", (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const userIndex = userRoutes.findIndex(b => b.id === userId);

    if (userIndex !== -1) {
        userRoutes[userIndex] = { id: userId, email: req.body.title, password: req.body.author };
        res.json(userRoutes[userIndex]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete a user by ID
router.delete("/users/:id", (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const userIndex = userRoutes.findIndex(b => b.id === userId);

    if (userIndex !== -1) {
        userRoutes.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

export default router;
