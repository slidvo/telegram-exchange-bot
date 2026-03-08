import type { TelegramBotClient } from "../../clients/TelegramBotClient.js";
import type { SendMessage } from "../../dto/SendMessage.js";
import type { Update } from "../../dto/Update.js";
import type { CommandsService } from "../CommandsService.js";

export class SlidwoCurrencyBotCommandsService implements CommandsService {
  constructor(private telegramBotClient: TelegramBotClient) {}
  /*
    Привет! Я помогу тебе узнать текущие курсы валют. 
    Напиши /currency для получения списка доступных валют.
 */
  async start(update: Update): Promise<void> {
    console.log(`DEBUG: update = ${JSON.stringify(update)}`);
    if (!update.message.chat.id) {
      return;
    }
    const sendMessageDto: SendMessage = {
      chat_id: update.message.chat.id,
      text: `Привет! Я помогу тебе узнать текущие курсы валют. 
Напиши /currency для получения списка доступных валют.`,
    };

    await this.telegramBotClient.sendMessage(sendMessageDto);
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
