import pkg from 'express';
const { Express, Request, Response } = pkg;
import dotenv from "dotenv";
import { embeddings } from './embeddings.mjs'

dotenv.config();

/** @type {Express}*/
const app = express();
const port = process.env.PORT;

app.use(express.json({
  limit: "50mb",
}));

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/embeddings", embeddings);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
