import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";
// import { Database } from "sqlite3";
import Database from "better-sqlite3";
import * as sqlite_vss from "sqlite-vss";
import pkg from 'express';
const { Express, Request, Response } = pkg;

const db = new Database(":memory:");

sqlite_vss.load(db);

// https://js.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/character_text_splitter
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
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

  res.json({});
}
