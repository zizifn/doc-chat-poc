import express from 'express';
import dotenv from "dotenv";
import { embeddings, embeddingsLookup } from './embeddings.mjs'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json({
  limit: "50mb",
}));

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/embeddings", embeddings);
app.use("/api/embeddingslookup", embeddingsLookup);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
