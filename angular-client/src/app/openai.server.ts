import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OpenAIService {
  async createEmbeddings(content: string) {
    const embeddingsResp = await fetch("api/embeddings", {
      method: "POST",
      body: JSON.stringify({
        raw: content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await embeddingsResp.json() ?? "";
  }

  async getEmbeddings(content: string): Promise<{ content:string }[]> {
    const embeddingsResp = await fetch("api/embeddings/lookup", {
      method: "POST",
      body: JSON.stringify({
        raw: content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await embeddingsResp.json() ?? "";
  }

  async chat(context: string, question: string): Promise<any> {
    const embeddingsResp = await fetch("api/chat", {
      method: "POST",
      body: JSON.stringify({
        context,
        question
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await embeddingsResp.json() ?? "";
  }
}
