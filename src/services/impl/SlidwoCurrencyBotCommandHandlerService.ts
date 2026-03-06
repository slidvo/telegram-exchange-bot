import type { SlidwoCurrencyBotCommand } from "../../dto/SlidwoCurrencyBotCommand.js";
import type { CommandsHandlerService } from "../CommandsHandlerService.js";

export class SlidwoCurrencyBotCommandHandlerService implements CommandsHandlerService {
  handleCommand(updateMessageText: string): void {
    const command = this.searchCommand(updateMessageText);
    if (!command) {
      return;
    }

    // commandsActionsMap.get(command).apply()

    //TODO create function to search command in string
  }

  private searchCommand(text: string): SlidwoCurrencyBotCommand | undefined {
    try {
      const splitedText = text.split(" ");
      return splitedText[0] as SlidwoCurrencyBotCommand;
    } catch (error) {
      return undefined;
    }
  }
}
