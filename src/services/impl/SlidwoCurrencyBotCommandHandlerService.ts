import type { Update } from "../../dto/Update.js";
import type { CommandsActionsProvider } from "../../providers/CommandsActionsProvider.js";
import type { CommandAction } from "../../types/types.js";
import type { CommandsHandlerService } from "../CommandsHandlerService.js";

export class SlidwoCurrencyBotCommandHandlerService implements CommandsHandlerService {
  constructor(private commandsActionsProvider: CommandsActionsProvider) {}

  handleCommand(command: string, update: Update): void {
    console.log(`DEBUG: command=${command}`);
    const action = this.commandsActionsProvider
      .getActionsMap<CommandAction>()
      .get(command);
    if (!action) {
      console.log("action not exists");
      return;
    }
    console.log(`DEBUG: action=${JSON.stringify(action)}`);
    console.log(`DEBUG: typeof action.execute=${typeof action.execute}`);
    action.execute(update);
  }
}
