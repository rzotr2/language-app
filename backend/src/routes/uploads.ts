import {Request, Response, Router} from "express";
import path from "node:path";

const router = Router();

router.get("/:lang", (req: Request, res: Response) => {
    const lang = req.params.lang || "DE";
    const filePath = path.join(process.cwd(), "assets", `Lebenslauf Pavlo Lukin ${lang}.pdf`);
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send("File not found");
        }
    });
});

export default router;
