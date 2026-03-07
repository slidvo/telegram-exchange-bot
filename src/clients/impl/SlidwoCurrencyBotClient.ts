import type { SendMessage } from "../../dto/SendMessage.js";
import type { TelegramBotClient } from "../TelegramBotClient.js";

export default class SlidwoCurrencyBotClient implements TelegramBotClient {
  sendMessage(msg: SendMessage): void {
    //TODO implements this method https://core.telegram.org/bots/api#sendmessage
    // console.log(`DEBUG: /.env ${process.env.TELEGRAM_BOT_TOKEN}`);
    console.log(`DEBUG: /start response sent`);
    //TODO Как отправить запрос на https://api.telegram.org/botToken/sendMessage
  }
}
