import type { CommandsService } from "../CommandsService.js";

export class SlidwoCurrencyBotCommandsService implements CommandsService {
  start(): void {
    //TODO use API sendMessage, for sending result of command handling to user in telegram chat
    throw new Error("Method not implemented.");
  }
  info(): void {
    console.log(`DEBUG: command /info processed successfully`);
    //TODO use API sendMessage, for sending result of command handling to user in telegram chat
    throw new Error("Method not implemented.");
  }
  currency(): void {
    //TODO use API sendMessage, for sending result of command handling to user in telegram chat
    throw new Error("Method not implemented.");
  }
}
