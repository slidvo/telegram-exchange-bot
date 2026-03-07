import type { Update } from "../../dto/Update.js";
import type { CurrencyBotService } from "../CurrencyBotService.js";
import type { SlidwoCurrencyBotCommandHandlerService as CommandsHandler } from "./SlidwoCurrencyBotCommandHandlerService.js";

export class SlidwoCurrencyBotService implements CurrencyBotService {
  constructor(private commandsHandler: CommandsHandler) {}
  async processUpdate(update: Update): Promise<void> {
    this.commandsHandler.handleCommand(update);
  }
}
