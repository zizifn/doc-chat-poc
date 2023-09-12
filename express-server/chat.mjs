import { Config } from './config.mjs'

export async function chat(
  req,
  res,
) {
  const chatObj = req.body;
  if (!chatObj.context) {
    res.status(400).json({
      message: "raw can't be null",
    });
    return;
  }

  const resp = await chatCompletions(chatObj);
  res.json(resp);
}


/**
 * 
 * @param {{context: string, question:string}} chatObj 
 * @returns  {Promise<string>}
 */
async function chatCompletions(chatObj) {
  console.log('--------------------------', Config.OPENAI_KEY);
  const docPrompt = `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

  ${chatObj.context}
  
  Question: ${chatObj.question}
  Answer in context language`

  const resp = await fetch(`${Config.OPENAI_HOST}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Config.OPENAI_KEY}`
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": docPrompt
        }
      ]
    })
  });
  const chatBody = await resp.json();
  console.log("usage", chatBody.usage);
  return chatBody;


}

