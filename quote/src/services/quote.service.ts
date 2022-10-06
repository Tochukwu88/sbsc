import console from "console";
import { HttpClient } from "../utils/http-client.util";

export class Quote {
  static url = "https://type.fit/api/quotes";
  static httpClient = new HttpClient();
  //for caching
  static quotes = [];
  static async getQuote(): Promise<any> {
    if (!this.quotes.length) {
      this.quotes = await this.httpClient.get(this.url);
    }

    return this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }
}
