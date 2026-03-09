import { CommandsEnum } from "../enums/CommandsEnum.js";
import type { CommandsService } from "../services/CommandsService.js";
import type { ActionsProvider } from "./ActionsProvider.js";

export class CommandsActionsProvider implements ActionsProvider {
  constructor(private commandsService: CommandsService) {}
  getActionsMap<CommandAction>(): Map<string, CommandAction> {
    return new Map<string, CommandAction>([
      [
        CommandsEnum.Start,
        {
          execute: this.commandsService.start.bind(this.commandsService),
        } as CommandAction,
      ],
      [
        CommandsEnum.Currency,
        {
          execute: this.commandsService.currency.bind(this.commandsService),
        } as CommandAction,
      ],
    ]);
  }
}
