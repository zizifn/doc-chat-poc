import { Component } from "@angular/core";
import { OpenAIService } from "./openai.server"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "my-app";

  fileContent = "";
  
  chatHistory = "";

  constructor(private openaiService: OpenAIService) {
  }

  async loadFile(event: Event) {
    const files = (event.target as HTMLInputElement).files || [];
    const content = await files[0].text();
    console.log(content);
    this.fileContent = content;
  }

  async createEmbeddings() {
    if (!this.fileContent) {
      alert("no file upload");
    }

    const result = await this.openaiService.createEmbeddings(this.fileContent);
    console.log(result);
  }

  async askDoc(event: Event){
    const question =  (event.target as HTMLInputElement).value;
    // get embed
    const result = await this.openaiService.getEmbeddings(question);
    console.log(result);
    const context = result.map(item => item.content).join("\n")

    const chat = await this.openaiService.chat(context, question);
    console.log(chat);
    this.chatHistory = chat?.choices?.[0].message.content;
  }
}
