import type { SlidwoCurrencyBotCommand } from "../dto/SlidwoCurrencyBotCommand.js";

export interface CommandsHandlerService {
  handleCommand(updateMessageText: string): void;
}
