import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";
// import { Database } from "sqlite3";
import Database from "better-sqlite3";
import * as sqlite_vss from "sqlite-vss";
import { Config } from './config.mjs'
import pkg from 'express';
const { Express, Request, Response } = pkg;
import { sampleEmbedding } from './constant.mjs'

export async function chat(
  req,
  res,
) {
  const raw = req.body.context;
  if (!raw) {
    res.status(400).json({
      message: "raw can't be null",
    });
    return;
  }



  res.json({});
}


/**
 * 
 * @param {string | string[]} content 
 * @returns  {Promise<number[][]>}
 */
async function createOpenaiEmbeddings(content) {
  console.log('--------------------------', Config.OPENAI_KEY);
  const resp = await fetch("https://api.openai.com/v1/embeddings", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Config.OPENAI_KEY}`
    },
    body: JSON.stringify({
      input: content,
      model: "text-embedding-ada-002"
    })
  });
  const embeddingsBody = await resp.json();
  console.log(embeddingsBody);
  console.log("usage", embeddingsBody.usage);
  return embeddingsBody.data.map(item => item.embedding)


}

