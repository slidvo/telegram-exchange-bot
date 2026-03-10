import type { Update } from "../dto/Update.js";

export interface CommandsHandlerService {
  handleCommand(command: string, update: Update): void;
}
