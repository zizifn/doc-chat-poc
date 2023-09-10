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
}
