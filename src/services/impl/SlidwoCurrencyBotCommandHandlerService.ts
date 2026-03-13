import type { Update } from "../../dto/Update.js";
import type { CommandsActionsProvider } from "../../providers/CommandsActionsProvider.js";
import type { CommandAction } from "../../types/types.js";
import type { CommandsHandlerService } from "../CommandsHandlerService.js";
import log from "../../utils/logger.js";
export class SlidwoCurrencyBotCommandHandlerService implements CommandsHandlerService {
  constructor(private commandsActionsProvider: CommandsActionsProvider) {}

  handleCommand(command: string, update: Update): void {
    log.DEBUG(`command=${command}`);
    const action = this.commandsActionsProvider
      .getActionsMap<CommandAction>()
      .get(command);
    if (!action) {
      log.DEBUG("action not exists");
      return;
    }
    log.DEBUG(`action=${JSON.stringify(action)}`);
    log.DEBUG(`typeof action.execute=${typeof action.execute}`);
    action.execute(update);
  }
}
