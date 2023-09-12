import dotenv from "dotenv";
dotenv.config();

export const Config = {
    PORT: process.env.PORT || 3200,
    OPENAI_KEY: process.env.OPENAI_KEY,
    OPENAI_HOST: process.env.OPENAI_HOST || "https://api.openai.com"
}