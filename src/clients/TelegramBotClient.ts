import type { SendMessage } from "../dto/SendMessage.js";

export interface TelegramBotClient {
  //TODO
  sendMessage(msg: SendMessage): void;
}
