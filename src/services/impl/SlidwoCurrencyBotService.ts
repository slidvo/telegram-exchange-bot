import type { Update } from "../../dto/Update.js";
import type { CurrencyEnum } from "../../enums/CurrencyEnum.js";
import type { CurrencyBotService } from "../CurrencyBotService.js";
import type { CurrencyPairHandlerService as CurrencyPairHandler } from "../CurrencyPairHandlerService.js";
import type { SlidwoCurrencyBotCommandHandlerService as CommandsHandler } from "./SlidwoCurrencyBotCommandHandlerService.js";

export class SlidwoCurrencyBotService implements CurrencyBotService {
  constructor(
    private commandsHandler: CommandsHandler,
    private curencyPairHandler: CurrencyPairHandler,
  ) {}
  async processUpdate(update: Update): Promise<void> {
    const command = this.searchCommand(update.message.text);
    if (!command) {
      throw Error("Command not found");
    }

    if (this.isCommandCurrencyPiar(command)) {
      this.curencyPairHandler.currencyPairHandle(command, update);
      return;
    }

    this.commandsHandler.handleCommand(command, update);
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
    console.log(`DEBUG: curencyPair ${currencyPair}`);
    return /^[A-Za-z]{3}\/[A-Za-z]{3}/.test(currencyPair);
  }
}
