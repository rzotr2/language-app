import {Request, Response, Router} from "express";
import OpenAI from "openai";
import { authMiddleware} from "../middlewares/auth";

const router = Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_APIKEY,
});

router.get('/generate', authMiddleware, async (req: Request, res: Response) => {
    const request = req.query.text;

    try {
        const response = await openai.responses.create({
            model: "gpt-4.1-mini",
            input: [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_text",
                            "text": `${request}`
                        }
                    ]
                }
            ],
            text: {
                "format": {
                    "type": "text"
                }
            },
            reasoning: {},
            tools: [],
            temperature: 1,
            max_output_tokens: 2048,
            top_p: 1,
            store: true
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json("BAD REQUEST TO AI")
    }
})

export default router;
