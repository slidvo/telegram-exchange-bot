import https from "https";
import fs from "fs";
import type { SendMessage } from "../../dto/SendMessage.js";
import type { EnvironmentService } from "../../services/EnvironmentService.js";
import type { TelegramBotClient } from "../TelegramBotClient.js";
import type { BodyReaderService } from "../../services/BodyReaderService.js";
import type Message from "../../dto/Message.js";
import log from "../../utils/logger.js";

const TELEGRAM_BOT_TOKEN = "TELEGRAM_BOT_TOKEN";
export default class SlidwoCurrencyBotClient implements TelegramBotClient {
  constructor(
    private envService: EnvironmentService,
    private bodyReaderService: BodyReaderService,
  ) {}
  async sendMessage(msg: SendMessage): Promise<void> {
    const token = this.envService.get(TELEGRAM_BOT_TOKEN);

    log.DEBUG(`sendMessageDto= ${JSON.stringify(msg)} `);

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
      const rsBody = await this.bodyReaderService.readBody<Message>(res);
      console.log(`DEBUG: rsBody: ${JSON.stringify(rsBody)}`);
    });

    req.write(jsonData);
    req.end();
  }
}
