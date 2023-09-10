import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";
// import { Database } from "sqlite3";
import Database from "better-sqlite3";
import * as sqlite_vss from "sqlite-vss";
import pkg from 'express';
const { Express, Request, Response } = pkg;
import { sampleEmbedding } from './constant.mjs'

const db = new Database("chat-doc.db");

sqlite_vss.load(db);

// https://observablehq.com/@asg017/introducing-sqlite-vss

// db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');

db.exec(
  `create table IF NOT EXISTS chat_content(
    content text
  );`
)

db.exec(
  `create virtual table IF NOT EXISTS vss_chat_content using vss0(
    content_embedding(1536)
  );`
)
db.prepare(`DELETE FROM chat_content`).run();
db.prepare(`delete from vss_chat_content`).run();

const sampleContent = 'The food was delicious and the waiter...';
const row = db.prepare('SELECT rowid, * FROM chat_content WHERE content = ?').get(sampleContent);
const vss_chat_content = db.prepare(`SELECT rowid, content_embedding FROM vss_chat_content`).all();
// not exsit
if (!row) {
  const result = db.prepare('INSERT INTO chat_content (content) VALUES (?)').run(sampleContent);
  const result2 = db.prepare('INSERT INTO vss_chat_content (content_embedding) VALUES (?)').run(JSON.stringify(sampleEmbedding));
  console.log(result);
  console.log(result2);
}
console.log('-------------', row);
console.log(vss_chat_content);

// const tables = db.prepare(
//   `SELECT * FROM sqlite_master
// WHERE type='table'`
// ).all();

// console.log(tables);

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
export async function embeddings(
  req,
  res,
) {
  const raw = req.body.raw;
  if (!raw) {
    res.status(400).json({
      message: "raw can't be null",
    });
    return;
  }

  // https://js.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/character_text_splitter

  // split by "\n\n"
  const splitter = new CharacterTextSplitter({
    separator: "\r\n\r\n",
    chunkSize: 500,
    chunkOverlap: 10,
  });
  const output = await splitter.createDocuments([raw]);
  console.dir(output, { depth: 5 });
  console.dir(output.length);

  console.log(process.env["OPENAI_KEY"]);
  // call openai embeddings
  const [version] = db.prepare("select vss_version()").pluck().get();
  console.log(version);

  res.json({ version });
}

export async function embeddingsLookup(
  req,
  res,
) {
  const raw = req.body.raw;
  if (!raw) {
    res.status(400).json({
      message: "raw can't be null",
    });
    return;
  }
  const embedding = JSON.stringify(sampleEmbedding);
  console.log(embedding);
  const tables = db.prepare(
    `select
    rowid,
    distance
  from vss_chat_content
  where vss_search(content_embedding, json('${JSON.stringify(sampleEmbedding)}'))
  limit 3;`
  ).all();

  res.json(tables);
}

