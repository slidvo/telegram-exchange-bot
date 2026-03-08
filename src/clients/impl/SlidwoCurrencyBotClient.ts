import type { SendMessage } from "../../dto/SendMessage.js";
import { TelegramTokenNotFoundError } from "../../errors/TelegramTokenNotFoundError.js";
import type { EnvironmentService } from "../../services/EnvironmentService.js";
import type { TelegramBotClient } from "../TelegramBotClient.js";

export default class SlidwoCurrencyBotClient implements TelegramBotClient {
  constructor(private envService: EnvironmentService) {}
  async sendMessage(msg: SendMessage): Promise<void> {
    //TODO implements this method https://core.telegram.org/bots/api#sendmessage
    // console.log(`DEBUG: /.env ${process.env.TELEGRAM_BOT_TOKEN}`);
    const token = this.envService.get("TELEGRAM_BOT_TOKEN");
    if (!token) {
      // TODO LoggerService
      throw new TelegramTokenNotFoundError();
    }

    console.log(`DEBUG: /start response sent`);
    //TODO Как отправить запрос на https://api.telegram.org/botToken/sendMessage
  }
}
