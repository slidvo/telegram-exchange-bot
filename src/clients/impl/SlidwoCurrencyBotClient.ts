import https from "https";
import type { SendMessage } from "../../dto/SendMessage.js";
import type { EnvironmentService } from "../../services/EnvironmentService.js";
import type { TelegramBotClient } from "../TelegramBotClient.js";

export default class SlidwoCurrencyBotClient implements TelegramBotClient {
  constructor(private envService: EnvironmentService) {}
  async sendMessage(msg: SendMessage): Promise<void> {
    const token = this.envService.get("TELEGRAM_BOT_TOKEN");

    console.log(`DEBUG: sendMessageDto= ${JSON.stringify(msg)} `);

    // const jsonData = JSON.stringify(msg);

    // const options: https.RequestOptions = {
    //   hostname: "example.com",
    //   port: 443,
    //   path: `https://api.telegram.org/${token}/sendMessage`,
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Content-Length": Buffer.byteLength(jsonData),
    //   },
    // };

    // const req = https.request(options, (res) => {});

    // req.write(jsonData);
    // req.end();
  }
}
