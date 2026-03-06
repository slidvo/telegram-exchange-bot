import { CommandsEnum } from "../../enums/CommandsEnum.js";
import type DefaultActionsProvider from "../../providers/DefaultActionsProvider.js";
import type { CommandAction } from "../../types/types.js";
import type { CommandsHandlerService } from "../CommandsHandlerService.js";

export class SlidwoCurrencyBotCommandHandlerService implements CommandsHandlerService {
  private commandsActionsMap: Map<string, CommandAction> = new Map([
    [CommandsEnum.Start, { apply: () => {} }],
  ]);

  constructor() {}

  handleCommand(updateMessageText: string): void {
    const command = this.searchCommand(updateMessageText);
    if (!command) return;
    this.commandsActionsMap.get(command)?.apply();
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
