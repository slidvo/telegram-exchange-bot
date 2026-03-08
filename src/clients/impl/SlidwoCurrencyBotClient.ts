import https from "https";
import type { SendMessage } from "../../dto/SendMessage.js";
import type { EnvironmentService } from "../../services/EnvironmentService.js";
import type { TelegramBotClient } from "../TelegramBotClient.js";

const TELEGRAM_BOT_TOKEN = "TELEGRAM_BOT_TOKEN";
export default class SlidwoCurrencyBotClient implements TelegramBotClient {
  constructor(private envService: EnvironmentService) {}
  async sendMessage(msg: SendMessage): Promise<void> {
    const token = this.envService.get(TELEGRAM_BOT_TOKEN);

    console.log(`DEBUG: sendMessageDto= ${JSON.stringify(msg)} `);

    const jsonData = JSON.stringify(msg);

    const sendMessagePath = `https://api.telegram.org/${token}/sendMessage`;

    const options: https.RequestOptions = {
      hostname: "example.com",
      port: 443,
      path: sendMessagePath,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(jsonData),
      },
    };

    console.log(`DEBUG: sendMessagePath: ${sendMessagePath}`);

    const req = https.request(options, (res) => {});

    req.write(jsonData);
    req.end();
  }
}
