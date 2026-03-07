import type { TelegramBotClient } from "../../clients/TelegramBotClient.js";
import type { SendMessage } from "../../dto/SendMessage.js";
import type { CommandsService } from "../CommandsService.js";

export class SlidwoCurrencyBotCommandsService implements CommandsService {
  constructor(private telegramBotClient: TelegramBotClient) {}
  /*
    Привет! Я помогу тебе узнать текущие курсы валют. 
    Напиши /currency для получения списка доступных валют.
 */
  start(chatId: number | string): void {
    const sendMessageDto: SendMessage = {
      chat_id: chatId,
      text: `Привет! Я помогу тебе узнать текущие курсы валют. 
Напиши /currency для получения списка доступных валют.`,
    };

    this.telegramBotClient.sendMessage(sendMessageDto);
  }

  info(): void {
    console.log(`DEBUG: command /info processed successfully`);
    //TODO use API sendMessage, for sending result of command handling to user in telegram chat
    throw new Error("Method not implemented.");
  }
  currency(): void {
    //TODO use API sendMessage, for sending result of command handling to user in telegram chat
    throw new Error("Method not implemented.");
  }
}
