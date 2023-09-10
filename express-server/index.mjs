import express from 'express';
import { Config } from './config.mjs'
import { embeddings, embeddingsLookup } from './embeddings.mjs'

const app = express();
const port = Config.PORT;

app.use(express.json({
  limit: "50mb",
}));

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/embeddings", embeddings);
app.use("/api/embeddingslookup", embeddingsLookup);
app.use("/api/chat", embeddingsLookup);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
