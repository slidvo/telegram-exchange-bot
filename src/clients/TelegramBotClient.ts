import type { SendMessage } from "../dto/SendMessage.js";

export interface TelegramBotClient {
  sendMessage(msg: SendMessage): Promise<void>;
}
