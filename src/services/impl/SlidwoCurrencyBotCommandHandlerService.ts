import type { Update } from "../../dto/Update.js";
import type { CommandsActionsProvider } from "../../providers/CommandsActionsProvider.js";
import type { CommandAction } from "../../types/types.js";
import type { CommandsHandlerService } from "../CommandsHandlerService.js";

export class SlidwoCurrencyBotCommandHandlerService implements CommandsHandlerService {
  constructor(private commandsActionsProvider: CommandsActionsProvider) {}

  handleCommand(update: Update): void {
    const command = this.searchCommand(update.message.text);
    if (!command) {
      return;
    }
    this.commandsActionsProvider
      .getActionsMap<CommandAction>()
      .get(command)
      ?.apply(update);
  }

  private searchCommand(text: string): string | undefined {
    try {
      const separatedText = text.split(" ");
      return separatedText[0];
    } catch (error) {
      return undefined;
    }
  }
}
