import type { Update } from "../../dto/Update.js";
import type { CurrencyBotService } from "../CurrencyBotService.js";
import type { CurrencyPairHandlerService as CurrencyPairHandler } from "../CurrencyPairHandlerService.js";
import type { SlidwoCurrencyBotCommandHandlerService as CommandsHandler } from "./SlidwoCurrencyBotCommandHandlerService.js";
import log from "../../utils/logger.js";
import type { TelegramBotClient } from "../../clients/TelegramBotClient.js";

export class SlidwoCurrencyBotService implements CurrencyBotService {
  constructor(
    private commandsHandler: CommandsHandler,
    private curencyPairHandler: CurrencyPairHandler,
    private telegramBotClient: TelegramBotClient,
  ) {}
  async processUpdate(update: Update): Promise<void> {
    try {
      const command = this.searchCommand(update.message.text);
      if (!command) {
        throw new Error("Command not found");
      }

      if (this.isCommandCurrencyPiar(command)) {
        await this.curencyPairHandler.currencyPairHandle(command, update);
        return;
      }
      //TODO add try catch sendMesasge
      this.commandsHandler.handleCommand(command, update);
    } catch (error) {
      log.ERROR(
        `Ошибка обработки сообщения SlidwoCurrencyBotService.processUpdate ${error}`,
      );
      this.telegramBotClient.sendMessage({
        chat_id: update.message.chat.id,
        text: (error as Error).message,
      });
    }
  }

  private searchCommand(text: string): string | undefined {
    try {
      const separatedText = text.split(" ");
      return separatedText[0];
    } catch (error) {
      return undefined;
    }
  }

  private isCommandCurrencyPiar(currencyPair: string): boolean {
    log.DEBUG(`curencyPair ${currencyPair}`);
    return /^[A-Za-z]{3}\/[A-Za-z]{3}/.test(currencyPair);
  }
}
