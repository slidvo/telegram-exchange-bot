import { CommandsEnum } from "../../enums/CommandsEnum.js";
import type { CommandsActionsProvider } from "../../providers/CommandsActionsProvider.js";
import type { CommandAction } from "../../types/types.js";
import type { CommandsHandlerService } from "../CommandsHandlerService.js";

export class SlidwoCurrencyBotCommandHandlerService implements CommandsHandlerService {
  constructor(private commandsActionsProvider: CommandsActionsProvider) {}

  handleCommand(updateMessageText: string): void {
    const command = this.searchCommand(updateMessageText);
    if (!command) return;
    this.commandsActionsProvider
      .getActionsMap<CommandAction>()
      .get(command)
      ?.apply();
  }

  searchCommand(text: string): string | undefined {
    try {
      const splitedText = text.split(" ");
      return splitedText[0];
    } catch (error) {
      return undefined;
    }
  }
}
