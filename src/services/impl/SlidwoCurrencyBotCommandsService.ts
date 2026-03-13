import type { TelegramBotClient } from "../../clients/TelegramBotClient.js";
import type { SendMessage } from "../../dto/SendMessage.js";
import type { Update } from "../../dto/Update.js";
import log from "../../utils/logger.js";
import type { CommandsService } from "../CommandsService.js";

export class SlidwoCurrencyBotCommandsService implements CommandsService {
  constructor(private telegramBotClient: TelegramBotClient) {}
  /*
    Привет! Я помогу тебе узнать текущие курсы валют. 
    Напиши /currency для получения списка доступных валют.
 */
  async start(update: Update): Promise<void> {
    log.DEBUG(`update = ${JSON.stringify(update)}`);
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

  async currency(update: Update): Promise<void> {
    if (!update.message.chat.id) {
      return;
    }
    await this.telegramBotClient.sendMessage({
      chat_id: update.message.chat.id,
      text: "Введи валютную пару в формате USD-EUR, чтобы узнать курс обмена.",
    });
  }
}
