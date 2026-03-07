import { CommandsEnum } from "../enums/CommandsEnum.js";
import type { CommandsService } from "../services/CommandsService.js";
import type { ActionsProvider } from "./ActionsProvider.js";

export class CommandsActionsProvider implements ActionsProvider {
  constructor(private commandsService: CommandsService) {}
  getActionsMap<T>(): Map<string, T> {
    return new Map<string, T>([
      [
        CommandsEnum.Start,
        this.commandsService.start.bind(this.commandsService) as T,
      ],
      [
        CommandsEnum.Info,
        this.commandsService.info.bind(this.commandsService) as T,
      ],
    ]);
  }
}
