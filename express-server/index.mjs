import express from 'express';
import { Config } from './config.mjs'
import { embeddings, embeddingsLookup, lookup, tables, deleteTables } from './embeddings.mjs'
import { chat } from './chat.mjs'
const app = express();
const port = Config.PORT;

app.use(express.json({
  limit: "50mb",
}));

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/tables/:table", tables);
app.use("/api/delete", deleteTables);
app.use("/api/embeddings/create", embeddings);
app.use("/api/embeddingslookup", embeddingsLookup);
app.use("/api/embeddings/lookup", lookup);
app.use("/api/chat", chat);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
