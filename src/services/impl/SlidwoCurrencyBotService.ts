import type { Update } from "../../dto/Update.js";
import type { CurrencyBotService } from "../CurrencyBotService.js";
import type { SlidwoCurrencyBotCommandHandlerService as CommandsHandler } from "./SlidwoCurrencyBotCommandHandlerService.js";

export class SlidwoCurrencyBotService implements CurrencyBotService {
  constructor(private commandsHandler: CommandsHandler) {}
  async processUpdate(update: Update): Promise<void> {
    // TODO get command
    //TODO isCommandRurrencyPiar this.currencyHandler,handleCurrencyPair(pair) / pair {main:"USD", secondary:"RUB"}
    this.commandsHandler.handleCommand(update);
  }
}
