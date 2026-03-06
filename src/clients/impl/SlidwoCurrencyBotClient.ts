import type TelegramBotClient from "../TelegramBotClient.js";

export default class SlidwoCurrencyBotClient implements TelegramBotClient {
  sendMessage(msg: string): void {
    //TODO implements this method https://core.telegram.org/bots/api#sendmessage
    throw new Error("Method not implemented.");
  }
}
