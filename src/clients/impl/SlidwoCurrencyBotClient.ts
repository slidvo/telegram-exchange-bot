import https from "https";
import fs from "fs";
import type { SendMessage } from "../../dto/SendMessage.js";
import type { EnvironmentService } from "../../services/EnvironmentService.js";
import type { TelegramBotClient } from "../TelegramBotClient.js";
import type { RequestBodyService } from "../../services/RequestBodyService.js";

const TELEGRAM_BOT_TOKEN = "TELEGRAM_BOT_TOKEN";
export default class SlidwoCurrencyBotClient implements TelegramBotClient {
  constructor(
    private envService: EnvironmentService,
    private requestBodyService: RequestBodyService,
  ) {}
  async sendMessage(msg: SendMessage): Promise<void> {
    const token = this.envService.get(TELEGRAM_BOT_TOKEN);

    console.log(`DEBUG: sendMessageDto= ${JSON.stringify(msg)} `);

    const jsonData = JSON.stringify(msg);

    const sendMessagePath = `/bot${token}/sendMessage`;
    const ca = fs.readFileSync("/etc/nginx/ssl/self-signed-certificate.crt");
    const options: https.RequestOptions = {
      hostname: "api.telegram.org",
      port: 443,
      path: sendMessagePath,
      method: "POST",
      ca: ca,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(jsonData),
      },
    };

    console.log(`DEBUG: sendMessagePath: ${sendMessagePath}`);

    const req = https.request(options, async (res) => {
      console.log(`DEBUG: path= /bot${token}/sendMessage`);
      console.log(`DEBUG: token= ${token}`);
      // rename readRequestBody with readBody and requestBodyService with httpBodyService
      const rsBody = await this.requestBodyService.readBody(res);
      console.log(`DEBUG: rsBody: ${rsBody}`);
    });

    req.write(jsonData);
    req.end();
  }
}
