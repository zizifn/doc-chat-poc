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
}
