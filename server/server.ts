import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { prompt2 } from "./prompt-system";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/sendmessage", async (req: express.Request, res: any) => {
  const { body } = req.body;
  let message;

  try {
    const parsedData = JSON.parse(body);
    message = parsedData.message;

    if (!message) {
      throw new Error("Message is required");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt2 },
        { role: "user", content: message },
      ],
      temperature: 0.1,
    });
    return res.send(response.choices[0].message);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});
